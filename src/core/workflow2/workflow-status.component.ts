import { ChangeDetectionStrategy, Component, Input, HostBinding } from '@angular/core';

import { formStatusClass, formStatusText } from './form-status';
import { StatusConverter, workflowStatusClass, workflowStatusText } from './workflow-status';

@Component({
    selector: 'tm-workflow-status',
    template: '{{label}}',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowStatusComponent {
    @Input() status: string;
    @Input() formStatus: string;
    @Input() workflowStatusConverter: StatusConverter = {
        toText: workflowStatusText,
        toClass: workflowStatusClass,
    };
    @Input() formStatusConverter: StatusConverter = {
        toText: formStatusText,
        toClass: formStatusClass,
    };

    @HostBinding('class')
    get hostClass(): string {
        let value: string;
        if (this.formStatus) {
            value = this.formStatusConverter.toClass(this.formStatus);
        }
        if (!value && this.status) {
            value = this.workflowStatusConverter.toClass(this.status);
        }
        if (value) {
            return `badge badge-${value}`;
        }
        else {
            return null;
        }
    }

    get label(): string {
        let value : string;
        if (this.formStatus) {
            value = this.formStatusConverter.toText(this.formStatus);
        }
        if (!value && this.status) {
            value =  this.workflowStatusConverter.toText(this.status);
        }
        return value;
    }
}
