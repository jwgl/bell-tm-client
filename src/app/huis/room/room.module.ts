import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';

import { PublicRoomRoutingModule as PublicRoomRoutingModule } from './room.routing';
import { PublicRoomComponent as PublicRoomComponent } from './room.component';
import { PublicRoomService as PublicRoomService } from './room.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        PublicRoomRoutingModule,
    ],
    declarations: [
        PublicRoomComponent,
    ],
    providers: [
        PublicRoomService,
        { provide: 'PUBLIC_ROOM_API_URL', useValue: '/api/huis/users/${userId}/publicRooms' },
    ],
})
export class PublicRoomModule { }
