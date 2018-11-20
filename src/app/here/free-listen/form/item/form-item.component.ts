import { Component } from '@angular/core';

import { WorkflowForm } from 'core/workflow/form-item.model';
import { Editable } from 'core/form';
import { Schedule, ScheduleDto, Timetable } from 'core/models';

import { FreeListenForm, FreeListenSettings } from '../../shared/free-listen-form.model';

@Component({
    templateUrl: 'form-item.component.html',
})
export class FreeListenFormItemComponent {
    settings: FreeListenSettings;
    timetable: Timetable;
    bindedConvert: any;

    constructor() {
        this.bindedConvert = this.convert.bind(this);
    }

    convert(dto: any): WorkflowForm {
        this.settings = new FreeListenSettings(dto.settings);
        const studentSchedules: Schedule[] = dto.studentSchedules.map((s: ScheduleDto) => new Schedule(s));
        const departmentSchedules: Schedule[] = dto.departmentSchedules.map((s: ScheduleDto) => new Schedule(s, 'department'));
        this.timetable = new Timetable(studentSchedules.concat(departmentSchedules));
        return new (Editable(FreeListenForm))(dto.form, studentSchedules);
    }
}
