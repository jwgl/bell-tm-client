import { Pipe, PipeTransform } from '@angular/core';

import { workflowResultText } from './workflow-result';

@Pipe({ name: 'workflowResultText' })
export class WorkflowResultTextPipe implements PipeTransform {
    transform(value: string) {
        return workflowResultText(value);
    }
}
