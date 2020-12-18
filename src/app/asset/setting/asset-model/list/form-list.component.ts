import { Component } from '@angular/core';

import { Dialog } from 'core/dialogs';

import { AssetModelService } from '../asset-model.service';
import { AssetModelDialog } from './form-editor.dialog';

@Component({
    templateUrl: 'form-list.component.html',
})
export class AssetModelListComponent {
    list: [];

    constructor(
        private service: AssetModelService,
        private dialog: Dialog) {
        this.loadData();
    }

    loadData() {
        this.service.loadList().subscribe((dto: any) => {
            this.list = dto;
        });
    }

    editor() {
        this.dialog.open(AssetModelDialog).then(result =>
            this.service.create(result).subscribe(() => this.loadData())
        );
    }
}
