import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialog } from 'core/dialogs';

import { AreaService } from '../area.service';
import { Asset } from '../../shared/asset-form.model';
import { TransferFormService } from '../transfer.service';
import { AssetOptionDialog } from './asset-option.dialog';
import { CheckoutDialog } from './checkout.dialog';

@Component({
    templateUrl: 'form-list.component.html',
})
export class AreaListComponent {
    assets: Asset[];
    buildings: any;
    assetNames: any;
    states: any;
    places: any;
    areas: any;
    assetsSelected: any;

    constructor(
        private service: AreaService,
        private route: ActivatedRoute,
        private router: Router,
        private transferService: TransferFormService,
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
        this.areas = dto.areas;
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

    onRowSelected(ids: any) {
        this.assetsSelected = this.assets.filter((asset: any) => ids.some(id => asset.id === id));
    }

    checkout() {
        if (!this.assetsSelected) {
            alert('请先选取要领用的设备,再点“领用”按钮！');
        }
        if (this.assetsSelected.some((asset: any) =>
            asset.building !== '图书馆' || asset.place !== 'A101' || asset.state !== '备用'
        )) {
            alert('包含了不可领用的设备，请重新选择！');
        } else {
            this.dialog.open(CheckoutDialog, {
                form: {},
                assets: this.assetsSelected,
                buildings: this.areas,
                places: this.places,
                transferType: '领用',
            }).then(result => {
                this.create(result);
            });
        }
    }

    create(form: any) {
        this.transferService.create(form).subscribe(id =>
            this.router.navigate(['../forms/', id], { relativeTo: this.route })
        );
    }
}
