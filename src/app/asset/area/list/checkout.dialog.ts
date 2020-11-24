import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';
import { AreaService } from '../area.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'checkout.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class CheckoutDialog extends BaseDialog {
    assets: any;
    buildings: any;
    places: any;
    placesShow: any;
    form: any;

    constructor(private service: AreaService) {
        super();
    }

    protected onOpening(): Observable<any> {
        this.form = this.options.form;
        this.buildings = this.options.buildings;
        this.places = this.options.places;
        this.form.building = this.buildings[0];
        this.placesShow = this.places.filter(place => place.building === this.form.building);
        this.assets = this.options.assets;
        return null;
    }

    protected onConfirmed(): any {
        return {
            note: this.form.note,
            toId: this.form.toId,
            addedItems: this.assets.map(item => ({id: item.id})),
        };
    }

    buildingChange(building: any) {
        this.placesShow = this.places.filter(place => place.building === building);
    }
}
