import { ChangeDetectionStrategy, Component, Input, HostBinding } from '@angular/core';

import { workflowStatusClass } from './workflow-status';

@Component({
    selector: 'workflow-status',
    template: '{{status | workflowStatusText}}',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowStatusComponent {
    @Input() status: string;

    @HostBinding('class')
    get hostClass(): string {
        return `badge badge-${workflowStatusClass(this.status)}`;
    }
}
