import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseDialog } from '../dialogs';

@Component({
    templateUrl: 'initiator-complete.dialog.html',
})
export class WorkflowInitiatorCompleteDialog extends BaseDialog {
    result: { comment: string };
    wordsCount: number;

    constructor() {
        super();
        this.result = { comment: null };
    }

    protected onOpening(): Observable<any> {
        this.wordsCount = this.options.wordsCount;
        return null;
    }

    protected onConfirmed(): any {
        return this.result;
    }
}
