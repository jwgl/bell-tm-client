import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseDialog } from '../dialogs';

/**
 * options: {what: string}
 */
@Component({
    templateUrl: 'rollback.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class WorkflowRollbackDialog extends BaseDialog {
    result: { what: string, comment: string };

    constructor() {
        super();
        this.result = { what: null, comment: null };
    }

    protected onOpening(): Observable<any> {
        this.result.what = this.options.what;
        return null;
    }

    protected onConfirmed(): any {
        return this.result;
    }
}
