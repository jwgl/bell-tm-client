import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

@Component({
    templateUrl: 'form-editor.component.html',
})
// tslint:disable-next-line:component-class-suffix
export class FundImportDialog extends BaseDialog {
    form: any = {};

    constructor() {
        super();
    }

    get validate(): boolean {
        if (!this.form.fundType || !this.form.data) {
            return true;
        }
    }

    protected onOpening(): Observable<any> {
        return null;
    }

    protected onConfirmed(): any {
        return this.form;
    }
}
