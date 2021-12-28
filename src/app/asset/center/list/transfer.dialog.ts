import { Component } from '@angular/core';

import * as _ from 'lodash';
import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

@Component({
    templateUrl: 'transfer.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class TransferDialog extends BaseDialog {
    assets: any;
    transferType: string;
    form: any;
    uploadUrl: string;
    fileType: any;

    constructor() {
        super();
    }

    protected onOpening(): Observable<any> {
        this.form = this.options.form;
        this.uploadUrl = this.options.uploadUrl;
        this.fileType = this.options.fileType;
        this.form.toId = '';
        this.assets = this.options.assets;
        this.transferType = this.options.transferType;
        return null;
    }

    protected onConfirmed(): any {
        const roomIds = _.chain(this.assets).map(data => data['roomId']).uniq().value();
        if (roomIds.length === 1) {
            this.form.fromId = roomIds[0];
        }
        return {
            fromId: this.form.fromId,
            note: this.form.note,
            toId: this.form.toId,
            transferType: this.transferType,
            fileName: (this.fileType && this.fileType.names && this.fileType.names.length > 0) ? this.fileType.names[0] : '',
            addedItems: this.assets.map(item => ({ id: item.id })),
        };
    }

    commit() {
        if (this.transferType === '内部报废') {
            this.form.toId = 2;
        }else if (this.transferType === '核销') {
            this.form.toId = 3;
        }
        if (this.form.toId === '') {
            alert('请选择目标场地');
        } else {
            this.ok();
        }
    }
}
