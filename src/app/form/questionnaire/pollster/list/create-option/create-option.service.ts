import { Injectable } from '@angular/core';

import { Dialog } from 'core/dialogs';

import { CreateOptionDialog } from './create-option.dialog';

@Injectable()
export class CreateOptionDialogService {
    constructor(private dialog: Dialog) { }

    open(options: any): Promise<any> {
        return this.dialog.open(CreateOptionDialog, options);
    }
}
