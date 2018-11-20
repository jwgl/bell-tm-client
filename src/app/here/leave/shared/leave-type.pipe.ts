import { Pipe, PipeTransform } from '@angular/core';

import { LeaveType, LeaveTypeNames } from './leave-form.model';

@Pipe({ name: 'leaveType' })
export class LeaveTypePipe implements PipeTransform {
    transform(type: LeaveType) {
        return LeaveTypeNames[type];
    }
}
