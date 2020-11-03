import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { Room } from '../shared/form.model';
import { RoomFormService } from '../form.service';

@Component({
    templateUrl: 'item.component.html',
})
export class PlaceItemComponent {
    vm: Room;

    constructor(
        private route: ActivatedRoute,
        private service: RoomFormService,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadItem(params['id']).subscribe(dto => {
            this.vm = new Room(dto);
        });
    }
}
