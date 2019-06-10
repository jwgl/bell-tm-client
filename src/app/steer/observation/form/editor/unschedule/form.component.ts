import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';
import * as dayjs from 'dayjs';

import { CommonDialog } from 'core/common-dialogs';
import { EditMode } from 'core/constants';
import { NumberStringOption, DayOfWeekOptions } from 'core/options';
import { typeahead } from 'core/utils/typeahead';
import { AuthService } from 'core/auth';

import { ObservationFormService } from '../../form.service';
import { EvaluationItem, EvaluationMap, GRADES, ObservationForm, ScheduleSection, Term, Recommends } from '../../shared/form.model';
import { TeachingMethods } from '../../shared/form.model';
import '../form-editor.model';

import { UnScheduleService } from './unschedule.service';

@Component({
    styleUrls: ['form.component.scss'],
    templateUrl: 'form.component.html',
})
// tslint:disable-next-line:component-class-suffix
export class ObservationSpecial {
    @ViewChild('evaluationText', { static: false }) input: ElementRef;
    @ViewChild('suggest', { static: false }) suggest: ElementRef;

    editMode: EditMode;
    form: ObservationForm;
    term: Term;
    types: any[];
    grades = GRADES;
    evaluationSystem: EvaluationMap[];
    mydto: any;
    weekOfTerms: number[] = [];
    dayOfWeeks: NumberStringOption[] = [];
    sections: ScheduleSection[] = [];
    section: ScheduleSection;
    // 当前评价系统，还要根据不同教学形式进一步确定具体评分细则
    activeEvaluationSystem: any[];
    method: string;
    teachingMethods = TeachingMethods;
    recommendLabels = Recommends;
    root: string;

    valueFn: (item: any) => string;
    labelFn: (item: any) => string;

    constructor(
        private router: Router,
        private unscheduleService: UnScheduleService,
        private service: ObservationFormService,
        private route: ActivatedRoute,
        private authService: AuthService,
        private dialogs: CommonDialog,
    ) {
        this.method = '教师讲授';
        this.root = `/steer/obervers/${this.authService.userInfo.id}/observations`;
        this.valueFn = (item: any) => item.value;
        this.labelFn = (item: any) => item.label;
        this.editMode = this.route.snapshot.data['mode'];
        const params = this.route.snapshot.params;
        unscheduleService.loadDtoForCreate(params['taskId'], params['teacherId']).subscribe(dto => {
            this.onLoadData(dto, params['teacherId']);
        });
    }

    onLoadData(dto: any, teacherId: string) {
        this.term = dto.term;
        this.sections = dto.sections;
        this.types = dto.types;
        this.form = new ObservationForm({ timeslot: dto.timeslot, observerType: dto.types[0] });
        this.form.method = 1;
        this.form.recommend = 0;
        this.activeEvaluationSystem = dto.evaluationSystem;
        this.evaluationSystemSelected();
        // 默认最少听课1节
        this.form.totalSection = 1;
        this.form.observationWeek = this.term.currentWeek;
        this.section = this.sections[0];
        this.form.schedule.dayOfWeek = 1;
        // 指明这是无安排实践课
        this.form.isScheduleTemp = true;
        for (let i = this.term.startWeek; i <= this.term.endWeek; i++) {
            this.weekOfTerms.push(i);
        }

        this.dayOfWeeks = DayOfWeekOptions;

        setTimeout(() => {
            typeahead(this.input, 2, 10000).subscribe(value => this.save());
        }, 1);
        setTimeout(() => {
            typeahead(this.suggest, 2, 10000).subscribe(value => this.save());
        }, 1);
    }

    get startDate(): string {
        return this.term
            ? dayjs(this.term.startDate)
                .add(this.form.observationWeek - this.term.startWeek, 'week')
                .add(this.form.schedule.dayOfWeek - 1, 'day')
                .format('YYYY-MM-DD')
            : null;
    }

    get evaluateList(): any[] {
        return _.chain(this.evaluationSystem).map(data => data.value).flatten().map((item: EvaluationItem) => item.value).value();
    }

    get evaluateLevel(): number {
        const avg = _.round(_.mean(this.evaluateList.filter(s => !this.validate(s))), 1);
        return _.isNaN(avg) ? null : avg;
    }

    validate(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    save() {
        if (this.validate(this.form.schedule.place)) {
            this.dialogs.error(['上课地点不能空！']);
        } else {
            // 只有教师讲授时才需要计算总体评分
            if (this.form.method === 1) {
                this.form.evaluateLevel = this.evaluateLevel;
            }
            this.form.schedule.startSection = this.section.start;
            if (this.editMode === EditMode.Create) {
                this.create(this.form.toServerDto(this.evaluationSystem, this.term));
            } else if (this.editMode === EditMode.Edit) {
                this.update(this.form.toServerDto(this.evaluationSystem, this.term));
            }
        }
    }

    create(form: any) {
        this.unscheduleService.create(this.scheduleDto).subscribe(id => {
            this.form.schedule.id = id;
        });
        this.service.create(form).subscribe(id => {
            this.form.id = id;
            this.editMode = EditMode.Edit;
            if (this.form.status) {
                this.router.navigate([this.root, id], { relativeTo: this.route });
            }
        }, error => {
            alert(error.json().message);
        });
    }

    update(form: any) {
        this.unscheduleService.update(this.form.schedule.id, this.scheduleDto).subscribe(id => {
            this.form.schedule.id = id;
        });
        this.service.update(this.form.id, form).subscribe(id => {
            if (this.form.status) {
                this.router.navigate([this.root, id], { relativeTo: this.route });
            }
        }, error => {
            alert(error.json().message);
        });
    }

    commit() {
        const validate: string[] = [];
        if (_.some(this.evaluateList, this.validate)) {
            validate.push('请对全部评分项目都给出评分后再提交');
        }
        if (this.form.evaluateLevel < 0 || this.form.evaluateLevel > 5) {
            validate.push('评分范围0~5');
        }
        if (this.form.recommend > 0 && this.form.evaluateLevel < 4.5) {
            validate.push('不应推荐总评低于4.5的课程！');
        }
        if (validate.length) {
            this.dialogs.error(validate);
        } else {
            this.form.status = 1;
            this.save();
        }
    }

    get scheduleDto(): any {
        return {
            taskId: this.form.schedule.taskId,
            startWeek: this.form.observationWeek,
            endWeek: this.form.observationWeek,
            dayOfWeek: this.form.schedule.dayOfWeek,
            startSection: this.section.start,
            totalSection: this.section.total,
            place: this.form.schedule.place,
            teacherId: this.form.schedule.teacherId,
        };
    }

    onObjectSelected(object: any) {
        this.form.method = object.value;
        this.method = object.name;
        this.evaluationSystemSelected();
    }

    evaluationSystemSelected() {
        const test = this.form.method === 3 ? 2 : this.form.method;
        if (this.activeEvaluationSystem) {
            this.evaluationSystem = this.activeEvaluationSystem[test];
        }
    }
}
