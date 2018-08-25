import {Pipe} from '@angular/core';

import {LeaveType, LeaveTypeNames} from './leave-form.model';

@Pipe({name: 'leaveType'})
export class LeaveTypePipe {
    transform(type: LeaveType) {
        return LeaveTypeNames[type];
    }
}
