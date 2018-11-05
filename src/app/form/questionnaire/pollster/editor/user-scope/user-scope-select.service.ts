import { Injectable } from '@angular/core';

import { Dialog } from 'core/dialogs';

import { UserScopeSelectDialog } from './user-scope-select.dialog';

@Injectable()
export class UserScopeSelectDialogService {
    constructor(private dialog: Dialog) { }

    open(options: any): Promise<any> {
        return this.dialog.open(UserScopeSelectDialog, options);
    }
}
