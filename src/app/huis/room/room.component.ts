import { Component } from '@angular/core';
import * as Masonry from 'masonry-layout';

import { PublicRoomService } from './room.service';

@Component({
    styleUrls: ['room.component.scss'],
    templateUrl: 'room.component.html',
})
export class PublicRoomComponent {
    roomSchedules: any[];
    constructor(private service: PublicRoomService) {
        this.service.loadList().subscribe((data: any[]) => {
            this.roomSchedules = data;
            setTimeout(() => {
                var msnry = new Masonry( '.grid', {
                    "percentPosition": true
                  });
            });
        });
    }
}
