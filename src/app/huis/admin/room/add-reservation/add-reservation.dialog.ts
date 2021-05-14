import { Component } from '@angular/core';
import { BaseDialog } from 'core/dialogs';

import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';

@Component({
    styleUrls: ['add-reservation.dialog.scss'],
    templateUrl: 'add-reservation.dialog.html',
})
export class AddReservationDialog extends BaseDialog {
    lowerDate: string;
    upperDate: string;
    dateInterval: number;
    lowerTime: string;
    upperTime: string;
    note: string;
    constructor() {
        super();
    }

    protected onOpening(): Observable<any> {
        this.lowerDate = dayjs().format('YYYY-MM-DD');
        this.upperDate = dayjs().format('YYYY-MM-DD')
        this.dateInterval = 1;
        this.lowerTime = '08:00';
        this.upperTime = '12:00';
        return null
    }

    protected onConfirmed(): any {
        return {
            lowerDate: this.lowerDate,
            upperDate: this.upperDate,
            dateInterval: this.dateInterval,
            lowerTime: this.lowerTime,
            upperTime: this.upperTime,
            note: this.note,
        };
    }   
}
