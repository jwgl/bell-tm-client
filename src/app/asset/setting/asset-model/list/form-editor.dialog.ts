import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';
import { AssetModelService } from '../asset-model.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'form-editor.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class AssetModelDialog extends BaseDialog {
    form: any;

    constructor(private service: AssetModelService) {
        super();
    }

    protected onOpening(): Observable<any> {
        this.form = {};
        return null;
    }

    protected onConfirmed(): any {
        return this.form;
    }
}
