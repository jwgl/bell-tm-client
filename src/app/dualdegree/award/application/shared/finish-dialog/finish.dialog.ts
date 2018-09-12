import {Component} from '@angular/core';
import {Observable} from 'rxjs';

import {BaseDialog} from 'core/dialogs';

@Component({
    templateUrl: 'finish.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class WorkflowFinishDialog extends BaseDialog {
    comment: string;

    protected onOpening(): Observable<any> {
        return null;
    }

    protected onConfirmed(): any {
        return this.comment;
    }
}
