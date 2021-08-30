import { Component } from '@angular/core';

import { Room } from '../../../place/shared/form.model';

import { RoomFormService } from '../form.service';

@Component({
    templateUrl: 'form-list.component.html',
})
export class PlaceListComponent {
    rooms: Room[];
    createAble: boolean;

    constructor(private service: RoomFormService) {
        this.loadData();
    }

    loadData() {
        this.service.loadList().subscribe((dto: any) => {
            this.rooms = dto.rooms.map(it => new Room(it));
            this.createAble = dto.createAble;
        });
    }
}
