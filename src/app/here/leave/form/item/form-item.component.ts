import { Component } from '@angular/core';

import { Editable } from 'core/form';
import { WorkflowForm } from 'core/workflow/form-item.model';
import { WorkflowFormItemComponent } from 'core/workflow/form-item.component';
import { Schedule, ScheduleDto } from 'core/models';

import { LeaveForm } from '../../shared/leave-form.model';
import { LeaveFormService } from '../leave-form.service';

@Component({
    templateUrl: 'form-item.component.html',
})
export class LeaveFormItemComponent {
    constructor(private service: LeaveFormService) { }

    convert(dto): WorkflowForm {
        const schedules = dto.schedules.map((s: ScheduleDto) => new Schedule(s));
        return new (Editable(LeaveForm))(dto.form, schedules);
    }

    finish(id: any, wfi: WorkflowFormItemComponent) {
        this.service.finish(id).subscribe(() => {
            wfi.loadItem(id);
        });
    }
}
