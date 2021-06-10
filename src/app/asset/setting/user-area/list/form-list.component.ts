import { Component } from '@angular/core';

import { Dialog } from 'core/dialogs';
import { CommonDialog } from 'core/common-dialogs';

import { UserAreaService } from '../user-area.service';
import { UserAreaDialog } from './form-editor.dialog';

@Component({
    templateUrl: 'form-list.component.html',
})
export class UserAreaListComponent {
    list: [];

    constructor(
        private service: UserAreaService,
        private dialogs: CommonDialog,
        private dialog: Dialog) {
        this.loadData();
    }

    loadData() {
        this.service.loadList().subscribe((dto: any) => {
            this.list = dto;
        });
    }

    remove(item: any) {
        this.dialogs.confirm('删除', '确定要删除吗？').then(() =>
            this.service.delete(item.id).subscribe(() => this.loadData())
        );
    }
}
