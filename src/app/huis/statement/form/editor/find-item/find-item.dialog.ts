import { Component } from '@angular/core';
import { BaseDialog } from 'core/dialogs';

import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { filter, flatMap, map, mergeMap } from 'rxjs/operators';

import { StatementForm } from '../../../shared/statement-form.model';
import { StatementFormService } from '../../statement-form.service';

@Component({
    styleUrls: ['find-item.dialog.scss'],
    templateUrl: 'find-item.dialog.html',
})
export class FindItemDialog extends BaseDialog {
    form: StatementForm;

    constructor(private service: StatementFormService) {
        super();
    }

    protected onOpening(): Observable<any> {
        this.form = this.options.form;
        return this.service.loadRooms().pipe(map((items: any[]) =>
            items.map(item => ({
                ...item,
                facilities: (item.facilities as any[]).filter(bf =>
                    !this.form.items.find(formItem => formItem.id == bf.id)
                )
            })).filter(item => item.facilities.length > 0)
        ));
    }

    protected onConfirmed(): any {
        return (this.options.data as any[])
            .flatMap(item => (item.facilities as any[])
                .filter(bf => bf.selected)
                .map(bf => ({ ...bf, item: item })))
    }

    onClickItem(item: any) {
        item.facilities.forEach(it => {
            it.selected = item.selected;
        });
    }

    selectAll(select: boolean) {
        this.options.data.forEach(item => {
            item.selected = select
            item.facilities.forEach(it => {
                it.selected = select;
            });
        });
    }

    toDate(datetime: string): Date {
        return new Date(datetime.replace('Z', this.form.zoneOffset));
    }
}
