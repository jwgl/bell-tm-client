import { Directive, Input, HostListener, HostBinding } from '@angular/core';

import { Dialog } from '../dialogs/dialog';
import { WorkflowWorkitemsDialog } from './workitems.dialog';

@Directive({
    selector: 'button[workflow-workitems]',
})
export class WorkflowWorkitemsButtonDirective {
    @Input('workflow-workitems') workflowInstanceId: string;

    constructor(private dialog: Dialog) { }

    @HostListener('click')
    onClick() {
        this.dialog.open(WorkflowWorkitemsDialog, { instance: this.workflowInstanceId });
    }

    @HostBinding('class')
    get buttonClass() {
        return 'btn btn-secondary';
    }

    @HostBinding('style.display')
    get visible() {
        return !!this.workflowInstanceId ? '' : 'none';
    }
}
