import { Component } from '@angular/core';

import { Dialog } from 'core/dialogs';
import { CommonDialog } from 'core/common-dialogs';

import { Asset } from '../../shared/asset-form.model';
import { CenterService } from '../center.service';
import { AssetOptionDialog } from './asset-option.dialog';
import { AssetUpdatetDialog } from './asset-update.dialog';

@Component({
    templateUrl: 'form-list.component.html',
})
export class CenterListComponent {
    assets: any;
    buildings: any;
    assetNames: any;
    states: any;
    places: any;

    constructor(
        private service: CenterService,
        private dialog: Dialog,
        private dialogs: CommonDialog,
    ) {
        this.loadData(this.service.queryOptions);
    }

    loadData(query: any) {
        this.service.loadList(query).subscribe((dto: any) => {
            this.assets = dto.list.map(it => new Asset(it));
            this.assetNames = dto.assetNames;
            this.states = dto.states;
            this.buildings = dto.buildings;
            this.places = dto.places;
        });
    }

    query() {
        this.dialog.open(AssetOptionDialog, {
            assetNames: this.assetNames,
            buildings: this.buildings,
            states: this.states,
            places: this.places,
        }).then(result => this.loadData(result));
    }

    batchUpdate() {
        this.dialog.open(AssetUpdatetDialog).then(result => {
            if (result) {
                this.service.batchSave(result).subscribe(dto => {
                    if (dto.error && dto.error.length > 0) {
                        this.dialogs.error(dto.error);
                    }
                    if (dto.success > 0) {
                        alert(`成功录入${dto.success}个设备的资产编号和序列号`);
                    }
                    this.loadData(this.service.queryOptions);
                });
            }
        });
    }
}
