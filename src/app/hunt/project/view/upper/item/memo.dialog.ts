import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'memo.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class ProjectMemoDialog extends BaseDialog {
    comment: string;

    protected onOpening(): Observable<any> {
        this.comment = this.options.project.memo;
        return null;
    }

    protected onConfirmed(): any {
        return this.comment;
    }
}
