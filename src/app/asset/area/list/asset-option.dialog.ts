import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';
import { AreaService } from '../area.service';

@Component({
    templateUrl: 'asset-option.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class AssetOptionDialog extends BaseDialog {
    assetNames: any;
    buildings: any;
    places: any[];
    placesShow: any[];
    states: any;
    queryOptions: any = {};
    buildingSelected: any[];
    placeSelected: any[];
    assetNameSelected: any[];
    stateSelected: any;

    constructor(private service: AreaService) {
        super();
        if (this.service.queryOptions) {
            this.queryOptions = this.service.queryOptions;
        }
    }

    protected onOpening(): Observable<any> {
        this.assetNames = this.options.assetNames;
        this.buildings = this.options.buildings;
        this.places = this.options.places;
        this.placesShow = this.options.places;
        this.states = this.options.states;
        return null;
    }

    protected onConfirmed(): any {
        this.queryOptions.buildings = this.toValue(this.buildingSelected);
        this.queryOptions.places = this.toValue(this.placeSelected);
        this.queryOptions.assetNames = this.toValue(this.assetNameSelected);
        if (this.stateSelected) {
            this.queryOptions.state = this.stateSelected;
        }
        this.service.queryOptions = this.queryOptions;
        return this.queryOptions;
    }

    toValue(object: any): any {
        return object ? object.map(o => o.name) : null;
    }

    buildingChange(event: any) {
        console.log(this.buildingSelected);
        if (this.buildingSelected && this.buildingSelected.length > 0) {
            this.placesShow = this.places.filter(place =>
                this.buildingSelected.some(building => building.name === place.building));
            console.log(this.placesShow);
        }
    }
}
