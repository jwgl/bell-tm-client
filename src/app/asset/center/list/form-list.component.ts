import { Component } from '@angular/core';

import { Dialog } from 'core/dialogs';

import { Asset } from '../../shared/asset-form.model';
import { CenterService } from '../center.service';
import { AssetOptionDialog } from './asset-option.dialog';

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
    ) {
        this.service.loadList(this.service.queryOptions).subscribe(dto => this.loadData(dto));
    }

    loadData(dto: any) {
        this.assets = dto.list.map(it => new Asset(it));
        this.assetNames = dto.assetNames;
        this.states = dto.states;
        this.buildings = dto.buildings;
        this.places = dto.places;
    }

    query() {
        this.dialog.open(AssetOptionDialog, {
            assetNames: this.assetNames,
            buildings: this.buildings,
            states: this.states,
            places: this.places,
        }).then(result => {
            this.service.loadList(result).subscribe(dto => this.loadData(dto));
        });
    }
}
