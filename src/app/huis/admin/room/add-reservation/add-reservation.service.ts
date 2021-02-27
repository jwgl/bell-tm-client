import { Injectable } from '@angular/core';

import { Dialog } from 'core/dialogs';

import { AddReservationDialog } from './add-reservation.dialog';

@Injectable()
export class AddReservationDialogService {
    constructor(private dialog: Dialog) { }

    open(options: any): Promise<any> {
        return this.dialog.open(AddReservationDialog, options);
    }
}
