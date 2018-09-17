import { Component, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';
import { NumberStringOption, DayOfWeekOptions } from 'core/options';

import { ScheduleSection, scheduleSectionMap, Term } from '../../../shared/form.model';
import { ScheduleService } from '../schedule.service';

@Component({
    templateUrl: 'query-option.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class QueryOptionDialog extends BaseDialog implements AfterViewInit {
    term: Term;
    vm: {
        weekOfTerms?: number[];
        dayOfWeeks?: NumberStringOption[];
        sections?: ScheduleSection[];
        buildings?: string[];
        palceNames?: string[];
        departments?: any[];
        today?: any;
    };

    queryOptions: any = {};
    schedules: any[] = [];
    valueFn: (item: any) => string;
    labelFn: (item: any) => string;

    constructor(private service: ScheduleService) {
        super();
        this.vm = {
            weekOfTerms: [],
            dayOfWeeks: [],
        };
        this.valueFn = (item: any) => item.value;
        this.labelFn = (item: any) => item.label;
    }

    ngAfterViewInit() {
        this.service.loadDataForCreate().subscribe(dto => this.onLoadData(dto));
        this.vm.dayOfWeeks = DayOfWeekOptions;
    }

    onTeacherSelected(teacher: any): void {
        this.queryOptions.teacher = teacher;
    }

    onPlaceSelected(place: any): void {
        this.queryOptions.place = place;
    }

    onLoadData(dto: any) {
        this.term = dto.term;
        dto.sections.forEach((section: ScheduleSection) => scheduleSectionMap[section.id] = section);
        this.vm.departments = dto.departments;
        this.vm.buildings = dto.buildings;
        this.vm.sections = dto.sections;
        this.vm.today = dto.today;

        for (let i = this.term.startWeek; i <= this.term.endWeek; i++) {
            this.vm.weekOfTerms.push(i);
        }
        this.queryOptions = {
            weekOfTerm: this.term.currentWeek,
            section: this.vm.sections[0],
            place: { building: null, name: null },
            teacher: { id: null },
            dayOfWeek: 0,
            departmentId: null,
        };
    }

    protected onOpening(): Observable<any> {
        return null;
    }

    protected onConfirmed(): any {
        return this.queryOptions;
    }
}
