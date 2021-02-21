import { Pipe, PipeTransform } from '@angular/core';

import { userTaskStatusText, workflowStatusClass, workflowStatusText } from './workflow-status';

@Pipe({ name: 'workflowStatusText' })
export class WorkflowStatusTextPipe implements PipeTransform {
    transform(value: string) {
        return workflowStatusText(value);
    }
}

@Pipe({ name: 'workflowStatusClass' })
export class WorkflowStatusClassPipe implements PipeTransform {
    transform(value: string) {
        return workflowStatusClass(value);
    }
}

@Pipe({ name: 'userTaskStatusText' })
export class UserTaskStatusClassPipe implements PipeTransform {
    transform(value: string) {
        return userTaskStatusText(value);
    }
}
