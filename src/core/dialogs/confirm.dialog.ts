import { Component } from '@angular/core';
import { BaseDialog } from './base-dialog';

@Component({
    selector: 'confirm-dialog',
    templateUrl: 'confirm.dialog.html',
})
/**
 * options: {title: string, content: string}
 */
export class ConfirmDialog extends BaseDialog {
    constructor() {
        super();
    }
}
