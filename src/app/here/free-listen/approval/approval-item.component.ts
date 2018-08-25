import { Component } from '@angular/core';

import { Schedule, ScheduleDto, Timetable } from 'core/models';

import { FreeListenForm, FreeListenSettings } from '../shared/free-listen-form.model';

@Component({
    templateUrl: 'approval-item.component.html',
})
export class FreeListenApprovalItemComponent {
    form: FreeListenForm;
    timetable: Timetable;
    settings: FreeListenSettings;

    onItemLoaded(dto: any) {
        const studentSchedules: Schedule[] = dto.studentSchedules.map((s: ScheduleDto) => new Schedule(s));
        const departmentSchedules: Schedule[] = dto.departmentSchedules.map((s: ScheduleDto) => new Schedule(s, 'department'));
        this.form = new FreeListenForm(dto.form, studentSchedules);
        this.timetable = new Timetable(studentSchedules.concat(departmentSchedules));
        this.settings = new FreeListenSettings(dto.settings);
    }
}
