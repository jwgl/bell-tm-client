import { Component } from '@angular/core';

import { Room } from '../../../place/shared/form.model';

import { RoomFormService } from '../form.service';

@Component({
    templateUrl: 'form-list.component.html',
})
export class PlaceListComponent {
    rooms: Room[];
    buildings: any;
    placesShow: any[];
    places: any[];
    buildingSelected: any[];
    placeSelected: any[];
    queryOptions: any;
    placeTypes: any;
    departments: any;
    departmentSelected: any[];

    constructor(private service: RoomFormService) {
        this.loadData(null);
        this.queryOptions = {};
    }

    loadData(options: any) {
        this.service.loadList(options).subscribe((dto: any) => {
            this.rooms = dto.rooms ? dto.rooms.map(it => new Room(it)) : null;
            this.buildings = dto.buildings;
            this.places = dto.places;
            this.placesShow = dto.places;
            this.placeTypes = dto.placeTypes;
            this.departments = dto.departments;
        });
    }

    buildingChange(event: any) {
        if (this.buildingSelected && this.buildingSelected.length > 0) {
            this.placesShow = this.places.filter(place =>
                this.buildingSelected.some(building => building.name === place.building));
        }
    }

    query() {
        this.queryOptions.buildings = this.toValue(this.buildingSelected);
        this.queryOptions.roomNames = this.toValue(this.placeSelected);
        this.queryOptions.departments = this.toValue(this.departmentSelected);
        this.loadData(this.queryOptions);
    }

    toValue(object: any): any {
        return object ? object.map(o => o.name) : null;
    }
}
