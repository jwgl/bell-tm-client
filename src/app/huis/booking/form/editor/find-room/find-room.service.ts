import { Injectable } from '@angular/core';

import { Dialog } from 'core/dialogs';

import { FindRoomDialog } from './find-room.dialog';

@Injectable()
export class FindRoomDialogService {
    constructor(private dialog: Dialog) { }

    open(options: any): Promise<any> {
        return this.dialog.open(FindRoomDialog, options);
    }
}
