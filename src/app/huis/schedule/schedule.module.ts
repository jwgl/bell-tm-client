import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { CommonDirectivesModule } from 'core/common-directives';
import { IconModule } from 'core/icon';

import { RoomScheduleRoutingModule } from './schedule.routing';
import { RoomScheduleComponent } from './schedule.component';
import { RoomScheduleService } from './schedule.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ClipboardModule,
        IconModule,
        CommonDirectivesModule,
        RoomScheduleRoutingModule,
    ],
    declarations: [
        RoomScheduleComponent,
    ],
    providers: [
        RoomScheduleService,
        { provide: 'ROOM_SCHEDULE_API_URL', useValue: '/api/huis/users/${userId}/roomSchedules' },
    ],
})
export class RoomScheduleModule { }
