import { Component } from '@angular/core';

import { Business } from '../../../place/shared/label.model';
import { Room } from '../../../place/shared/form.model';
import { RoomFormService } from '../form.service';

@Component({
    templateUrl: 'label-list.component.html',
})
export class LabelListComponent {
    rooms: any[];
    queryOptions: any;
    labels: any = [];
    buildings: any;
    buildingSelected: any[];
    terms: any;
    labelTypes: any;
    business = Business;

    constructor(private service: RoomFormService) {
        this.loadData(null);
        this.queryOptions = {
            business: '排课',
            forLabel: true,
        };
    }

    loadData(options: any) {
        this.service.loadList(options).subscribe((dto: any) => {
            this.rooms = dto.rooms ? dto.rooms.map(it => new Room(it)) : null;
            this.labels = dto.labels;
            this.buildings = dto.buildings;
            this.terms = dto.terms;
            this.labelTypes = dto.labelTypes;
        });
    }

    filterByBusiness(business: string) {
        return (label: any) => label.business === business;
    }

    filterByType(typeId: number, business: string) {
        return (label: any) => (business ? label.business === business : true) && (typeId ? label.typeId === typeId : true);
    }

    query() {
        if (!this.queryOptions.termId) {
            alert('请选择学期');
        } else {
            this.queryOptions.buildings = this.toValue(this.buildingSelected);
            this.loadData(this.queryOptions);
        }
    }

    toValue(object: any): any {
        return object ? object.map(o => o.name) : null;
    }

    termText(id: number): string {
        return id > 0 ? `${Math.floor(id / 10)}-${Math.floor(id / 10) + 1}-${id % 10}` : null;
    }
}
