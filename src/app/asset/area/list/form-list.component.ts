import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialog } from 'core/dialogs';
import { SelectionType, ColumnMode } from '@swimlane/ngx-datatable';
import { AreaService } from '../area.service';
import { Asset } from '../../shared/asset-form.model';
import { TransferFormService } from '../transfer.service';
import { AssetOptionDialog } from './asset-option.dialog';
import { TransferDialog } from './transfer.dialog';

@Component({
    templateUrl: 'form-list.component.html',
})
export class AreaListComponent {
    assets: Asset[];
    buildings: any;
    assetNames: any;
    states = [{name: '在用', value: 'USING'}, {name: '备用', value: 'STANDBY'}];
    places: any;
    // areas: any;
    assetsSelected: any[];
    flush: boolean;
    ids = '';
    fields: any;
    ColumnMode = ColumnMode;
    q: string;
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
        this.buildings = dto.buildings;
        this.places = dto.places;
        // this.areas = dto.areas;
        this.fields = dto.fields;
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
        this.assetsSelected = this.assets.filter((asset: any) => ids.some(item => asset.id === item.id));
        this.ids = this.assetsSelected ? this.assetsSelected.map(item => item.id).join('-') : '';
    }

    transfer() {
        if (!this.assetsSelected) {
            alert('请先选取要设备,再点“区内流转”按钮！');
        } else if (this.assetsSelected.some((asset: any) => !this.places.some((place: any) => place.id === asset.roomId))) {
            alert('包含了不属于所辖楼区内的设备，请重新选择！');
        } else {
            this.dialog.open(TransferDialog, {
                form: {},
                assets: this.assetsSelected,
                buildings: this.buildings,
                places: this.places,
                transferType: '资产流转',
            }).then(result => {
                this.create(result);
            });
        }
        this.flushAfterAction();
    }

    checkout() {
        if (!this.assetsSelected) {
            alert('请先选取要领用的设备,再点“领用出库”按钮！');
        } else if (this.assetsSelected.some((asset: any) => asset.roomId !== 1)) {
            alert('包含了不可领用的设备，请重新选择！');
        } else {
            this.dialog.open(TransferDialog, {
                form: {},
                assets: this.assetsSelected,
                buildings: this.buildings,
                places: this.places,
                transferType: '领用出库',
            }).then(result => {
                this.create(result);
            });
        }
        this.flushAfterAction();
    }

    stop() {
        if (!this.assetsSelected) {
            alert('请先选取要停用的设备,再点“停用入库”按钮！');
        } else if (this.assetsSelected.some((asset: any) => !this.places.some((place: any) => place.id === asset.roomId))) {
            alert('包含了不属于所辖楼区内的设备，请重新选择！');
        }  else {
            this.dialog.open(TransferDialog, {
                form: {},
                assets: this.assetsSelected,
                buildings: this.buildings,
                places: this.places,
                transferType: '停用入库',
            }).then(result => {
                this.create(result);
            });
        }
        this.flushAfterAction();
    }

    create(form: any) {
        this.transferService.create(form).subscribe(id =>
            this.router.navigate(['../forms/', id], { relativeTo: this.route })
        );
    }

    flushAfterAction() {
        if (this.flush === undefined) {
            this.flush = true;
        } else {
            this.flush = !this.flush;
        }
    }

    get href(): string {
        if (this.ids === '' || this.ids.length > 600) {
            return `/api/asset/output?type=device-area`;
        } else {
            return `/api/asset/output?type=device&ids=${this.ids}`;
        }
    }

    saveFields(fields: any) {
        this.service.createHindField({ tableName: 'asset', fields }).subscribe();
    }

    localComparator(str1: string, str2: string): number {
        return String(str1).localeCompare(str2);
    }

    find() {
        this.service.loadList({q: this.q}).subscribe(dto => this.loadData(dto));
    }
}
