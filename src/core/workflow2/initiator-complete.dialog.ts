import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseDialog } from '../dialogs';

@Component({
    templateUrl: 'initiator-complete.dialog.html',
})
export class WorkflowInitiatorCompleteDialog extends BaseDialog {
    result: { comment: string };
    action: string;

    constructor() {
        super();
        this.result = { comment: null };
    }

    protected onOpening(): Observable<any> {
        this.action = this.options.action;
        return null;
    }

    protected onConfirmed(): any {
        return this.result;
    }
}
