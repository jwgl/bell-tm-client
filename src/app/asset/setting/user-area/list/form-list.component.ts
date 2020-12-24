import { Component } from '@angular/core';

import { Dialog } from 'core/dialogs';

import { UserAreaService } from '../user-area.service';
import { UserAreaDialog } from './form-editor.dialog';

@Component({
    templateUrl: 'form-list.component.html',
})
export class UserAreaListComponent {
    list: [];

    constructor(
        private service: UserAreaService,
        private dialog: Dialog) {
        this.loadData();
    }

    loadData() {
        this.service.loadList().subscribe((dto: any) => {
            this.list = dto;
        });
    }

    editor() {
        this.service.loadDataForCreate().subscribe((dto: any) => {
            this.dialog.open(UserAreaDialog, { buildings: dto.buildings, form: dto.form }).then(result => {
                this.service.create(result).subscribe(() => this.loadData());

            });
        });
    }

    remove(item: any) {
        this.service.delete(item.id).subscribe(() => this.loadData());
    }
}
