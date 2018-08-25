import { Component } from '@angular/core';

import { Schedule, ScheduleDto } from 'core/models';

import { LeaveForm } from '../shared/leave-form.model';

@Component({
    templateUrl: 'approval-item.component.html',
})
export class LeaveApprovalItemComponent {
    form: LeaveForm;

    onItemLoaded(dto: any) {
        this.form = new LeaveForm(dto.form, dto.schedules.map((s: ScheduleDto) => new Schedule(s)));
    }
}
