import { Component } from '@angular/core';

import { Room } from '../shared/form.model';

import { RoomFormService } from '../form.service';

@Component({
    templateUrl: 'form-list.component.html',
})
export class PlaceListComponent {
    rooms: Room[];
    createAble: boolean;
    fields: any;

    constructor(private service: RoomFormService) {
        this.loadData();
    }

    loadData() {
        this.service.loadList().subscribe((dto: any) => {
            this.rooms = dto.rooms.map(it => new Room(it));
            this.createAble = dto.createAble;
            this.fields = dto.fields;
        });
    }

    saveFields(fields: any) {
        this.service.createHindField({ tableName: 'room', fields }).subscribe();
    }
}
