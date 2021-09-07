import { Component } from '@angular/core';

import { Business } from '../../../place/shared/label.model';

import { RoomFormService } from '../form.service';

@Component({
    templateUrl: 'label-list.component.html',
})
export class LabelListComponent {
    rooms: any[];
    queryOptions: any;
    labels: any;
    buildings: any;
    buildingSelected: any[];
    terms: any;
    labelTypes: any;
    business = Business;

    constructor(private service: RoomFormService) {
        this.loadData(null);
        this.queryOptions = {};
    }

    loadData(options: any) {
        this.service.loadList(options).subscribe((dto: any) => {
            this.rooms = dto.rooms;
            this.labels = dto.labels;
            this.buildings = dto.buildings;
            this.terms = dto.terms;
            this.labelTypes = dto.labelTypes;
        });
    }

    filterByBusiness(business: string) {
        return (label: any) => label.business === business;
    }

    filterByType(typeId: number) {
        return (label: any) => typeId ? label.typeId === typeId : true;
    }

    query() {
        this.queryOptions.buildings = this.toValue(this.buildingSelected);
        this.loadData(this.queryOptions);
    }

    toValue(object: any): any {
        return object ? object.map(o => o.name) : null;
    }
}
