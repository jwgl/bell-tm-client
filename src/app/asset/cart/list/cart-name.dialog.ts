import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

@Component({
    templateUrl: 'cart-name.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class CartNameDialog extends BaseDialog {
    cartName: string;
    constructor() {
        super();
    }

    protected onOpening(): Observable<any> {
        return null;
    }

    protected onConfirmed(): any {
        return {cartName: this.cartName};
    }
}
