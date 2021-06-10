import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialog } from 'core/dialogs';
import { CommonDialog } from 'core/common-dialogs';

import { Asset } from '../../shared/asset-form.model';
import { CenterService } from '../center.service';
import { AssetOptionDialog } from './asset-option.dialog';
import { AssetUpdatetDialog } from './asset-update.dialog';
import { TransferDialog } from './transfer.dialog';
import { TransferFormService } from '../transfer.service';

@Component({
    templateUrl: 'form-list.component.html',
})
export class CenterListComponent {
    assets: any;
    buildings: any;
    assetNames: any;
    states: any;
    places: any;
    assetsSelected: any[];

    constructor(
        private service: CenterService,
        private transferService: TransferFormService,
        private route: ActivatedRoute,
        private router: Router,
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

    onRowSelected(ids: any) {
        this.assetsSelected = this.assets.filter((asset: any) => ids.some(item => asset.id === item.id));
    }

    scrap() {
        if (!this.assetsSelected) {
            alert('请先选取要设备,再点“内部报废”按钮！');
        } else if (this.assetsSelected.some((asset: any) => asset.place !== '中心库房')) {
            alert('包含了不属于中心库房的设备，请重新选择！');
        } else {
            this.dialog.open(TransferDialog, {
                form: {},
                assets: this.assetsSelected,
                transferType: '内部报废',
            }).then(result => {
                this.create(result);
            });
        }
    }

    close() {
        if (!this.assetsSelected) {
            alert('请先选取要设备,再点“核销”按钮！');
        } else if (this.assetsSelected.some((asset: any) => asset.place !== '报废库房')) {
            alert('包含了不属于报废库房的设备，请重新选择！');
        } else {
            this.dialog.open(TransferDialog, {
                form: {},
                assets: this.assetsSelected,
                uploadUrl: this.transferService.getUploadUrl(),
                fileType: {
                    prefix: 'close',
                    label: '核销单',
                    types: ['pdf', 'jpg', 'jpeg'],
                    names: [],
                },
                transferType: '核销',
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
