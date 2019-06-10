import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';
import * as dayjs from 'dayjs';

import { CommonDialog } from 'core/common-dialogs';
import { EditMode } from 'core/constants';
import { typeahead } from 'core/utils/typeahead';

import { ObservationFormService } from '../form.service';
import { EvaluationItem, EvaluationMap, GRADES, ObservationForm, Observers, Term, TeachingMethods, Recommends } from '../shared/form.model';
import './form-editor.model';

import { ScheduleService } from './schedule/schedule.service';
import { AuthService } from 'core/auth';

@Component({
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class ObservationFormEditorComponent {
    @ViewChild('evaluationText', { static: false }) input: ElementRef;
    @ViewChild('suggest', { static: false }) suggest: ElementRef;

    editMode: EditMode;
    form: ObservationForm;
    term: Term;
    weekOfTerms: any[];
    types: any[];
    grades = GRADES;
    evaluationSystem: EvaluationMap[];
    // 当前评价系统，还要根据不同教学形式进一步确定具体评分细则
    activeEvaluationSystem: any[];
    observers: Observers[];
    isAdmin: boolean;
    isCaptain: boolean;
    mydto: any;
    saving = false;
    teachingMethods = TeachingMethods;
    method: string;
    root: string;
    recommendLabels = Recommends;

    constructor(
        private router: Router,
        private scheduleService: ScheduleService,
        private service: ObservationFormService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private dialogs: CommonDialog,
    ) {
        this.method = '教师讲授';
        this.editMode = this.route.snapshot.data['mode'];
        const params = this.route.snapshot.params;
        this.root = `/steer/obervers/${this.authService.userInfo.id}/observations`;
        switch (this.editMode) {
            case EditMode.Create:
                this.scheduleService.findTimeslot(
                    params['teacherId'],
                    params['week'],
                    params['timeslotId'],
                ).subscribe(dto => this.onLoadData(dto, params['week']));
                break;
            case EditMode.Edit:
                this.service.loadItemForEdit(params['id']).subscribe(dto => this.onLoadData(dto, null));
                break;
        }
    }

    onLoadData(dto: any, week: string) {
        if (dto.formId && dto.timeslot) {
            this.router.navigate([this.root, dto.formId]);
        } else {
            if (!dto.form && dto.timeslot) {
                this.form = new ObservationForm({ timeslot: dto.timeslot, observerType: dto.types[0] });
                this.form.method = 1;
                this.form.recommend = 0;
                this.activeEvaluationSystem = dto.evaluationSystem;
                this.evaluationSystemSelected();
                this.form.observationWeek = _.toNumber(week);
                // 默认最少听课1节
                this.form.totalSection = 1;
                if (this.form.schedule && this.form.schedule.hasError) {
                    // 如果课表出现错误，应提示督导及时反馈
                    alert(this.form.schedule.hasError);
                }
            } else {
                this.form = new ObservationForm(dto.form);
                this.evaluationSystem = dto.evaluationSystem;
                const r = TeachingMethods.find(m => m.value === this.form.method);
                if (r) {
                    this.method = r.name;
                }
            }
            this.term = dto.term;
            this.types = dto.types;
            this.weekOfTerms = _.range(this.term.startWeek, this.term.endWeek + 1, 1);
            this.isAdmin = dto.isAdmin;
            this.isCaptain = dto.isCaptain;
            this.observers = dto.observers;
            setTimeout(() => {
                typeahead(this.input, 2, 10000).subscribe(value => this.save());
            }, 1);
            setTimeout(() => {
                typeahead(this.suggest, 2, 10000).subscribe(value => this.save());
            }, 1);
        }
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
        // 只有教师讲授时才需要计算总体评分
        if (this.form.method === 1) {
            this.form.evaluateLevel = this.evaluateLevel;
        }
        if (this.editMode === EditMode.Create) {
            this.create(this.form.toServerDto(this.evaluationSystem, this.term));
        } else if (this.editMode === EditMode.Edit) {
            this.update(this.form.toServerDto(this.evaluationSystem, this.term));
        }
    }

    create(form: any) {
        this.saving = true;
        this.service.create(form).subscribe(id => {
            this.form.id = id;
            this.editMode = EditMode.Edit;
            this.saving = false;
            if (this.form.status) {
                this.router.navigate([this.root, id], { relativeTo: this.route });
            }
        }, error => {
            this.saving = false;
            alert(error.message);
        });
    }

    update(form: any) {
        this.saving = true;
        this.service.update(this.form.id, form).subscribe(id => {
            this.saving = false;
            if (this.form.status) {
                this.router.navigate([this.root, id], { relativeTo: this.route });
            }
        }, error => {
            this.saving = false;
            alert(error.message);
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

    onObjectSelected(object: any) {
        this.form.method = object.value;
        this.method = object.name;
        this.form.teachingMethods = object.name;
        this.evaluationSystemSelected();
    }

    evaluationSystemSelected() {
        const test = this.form.method === 3 ? 2 : this.form.method;
        if (this.activeEvaluationSystem) {
            this.evaluationSystem = this.activeEvaluationSystem[test];
        }
    }
}
