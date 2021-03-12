import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IconModule } from 'core/icon';
import { CommonDirectivesModule } from 'core/common-directives';
import { CommonDialogsModule } from 'core/common-dialogs';

import { HuisSharedModule } from '../../shared/huis-shared.module';
import { RoomSettingRoutingModule } from './room-setting.routing';
import { RoomSettingComponent } from './room-setting.component';
import { RoomSettingService } from './room-setting.service';
import { AddReservationModule } from './add-reservation/add-reservation.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IconModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        HuisSharedModule,
        RoomSettingRoutingModule,
        AddReservationModule,
    ],
    declarations: [
        RoomSettingComponent,
    ],
    providers: [
        RoomSettingService,
        { provide: 'ROOM_SETTING_API_URL', useValue: '/api/huis/departments/${departmentId}/rooms' },
    ],
})
export class RoomSettingModule { }
