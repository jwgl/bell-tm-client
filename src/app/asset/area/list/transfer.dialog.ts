import { Component, ChangeDetectionStrategy } from '@angular/core';

import * as _ from 'lodash';
import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';
import { AreaService } from '../area.service';

@Component({
    templateUrl: 'transfer.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class TransferDialog extends BaseDialog {
    assets: any;
    buildings: any;
    places: any;
    placesShow: any;
    transferType: string;
    form: any;

    constructor(private service: AreaService) {
        super();
    }

    protected onOpening(): Observable<any> {
        this.form = this.options.form;
        this.form.toId = '';
        this.buildings = this.options.buildings;
        this.places = this.options.places;
        this.form.building = this.buildings[0];
        this.placesShow = this.places.filter(place => place.building === this.form.building);
        this.assets = this.options.assets;
        this.transferType = this.options.transferType;
        return null;
    }

    protected onConfirmed(): any {
        const roomIds = _.chain(this.assets).map(data => data['roomId']).uniq().value();
        if (roomIds.length === 1) {
            this.form.fromId = roomIds[0];
        }
        if (this.transferType === '停用入库') {
            this.form.toId = 1;
        }
        return {
            fromId: this.form.fromId,
            note: this.form.note,
            toId: this.form.toId,
            transferType: this.transferType,
            addedItems: this.assets.map(item => ({ id: item.id })),
        };
    }

    buildingChange(building: any) {
        this.placesShow = this.places.filter(place => place.building === building);
    }

    get noStop(): boolean {
        return this.transferType !== '停用入库';
    }

    filterByBuilding(building: string) {
        // 资产流转不允许流转到特殊场地
        return (place: any) => place.building === building && !(this.transferType === '资产流转' && place.id < 5);
    }

    commit() {
        if (this.form.toId === '') {
            alert('请选择目标场地');
        } else {
            this.ok();
        }
    }
}
