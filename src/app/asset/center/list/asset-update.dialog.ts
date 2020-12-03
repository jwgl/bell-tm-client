import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

@Component({
    templateUrl: 'asset-update.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class AssetUpdatetDialog extends BaseDialog {
    form: any = {};

    constructor() {
        super();
    }

    protected onOpening(): Observable<any> {
        return null;
    }

    protected onConfirmed(): any {
        return this.form;
    }
}
