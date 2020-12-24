import { Component } from '@angular/core';

import * as _ from 'lodash';
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
        const names = _.chain(this.list)
            .map(data => data['name'])
            .uniq()
            .sort((a: string, b: string) => a.localeCompare(b))
            .value();
        const assetNames = names.map(item => ({ name: item, value: item }));
        this.dialog.open(AssetModelDialog, { assetNames }).then(result =>
            this.service.create(result).subscribe(() => this.loadData())
        );
    }
}
