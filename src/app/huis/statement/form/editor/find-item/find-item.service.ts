import { Injectable } from '@angular/core';

import { Dialog } from 'core/dialogs';

import { FindItemDialog } from './find-item.dialog';

@Injectable()
export class FindItemDialogService {
    constructor(private dialog: Dialog) { }

    open(options: any): Promise<any> {
        return this.dialog.open(FindItemDialog, options);
    }
}
