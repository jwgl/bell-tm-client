import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

@Component({
    templateUrl: 'place-update.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class PlaceUpdatetDialog extends BaseDialog {
    form: any = {};

    constructor() {
        super();
    }

    protected onOpening(): Observable<any> {
        this.form = this.options;
        return null;
    }

    protected onConfirmed(): any {
        return this.form;
    }
}
