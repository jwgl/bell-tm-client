import { Component } from '@angular/core';

import { BaseDialog } from './base-dialog';

@Component({
    selector: 'error-message-dialog',
    styles: ['ul{margin-bottom:0}'],
    templateUrl: 'error-message.dialog.html',
})
/**
 * options: {errors: string[]}
 */
export class ErrorMessageDialog extends BaseDialog {
      constructor() {
        super();
      }
}
