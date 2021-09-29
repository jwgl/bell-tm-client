import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';

import { FindRoomDialog } from './find-room.dialog';
import { FindRoomDialogService } from './find-room.service';
import { IsBasicFacilityPipe, IsExtraFacilityPipe, IsRequriedFacilityPipe } from './facility.pipe';
import { TimeValidator } from './time-validator';
import { ConflictValidatorDirective } from './conflict-validator';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
    ],
    declarations: [
        FindRoomDialog,
        IsBasicFacilityPipe,
        IsExtraFacilityPipe,
        IsRequriedFacilityPipe,
        TimeValidator,
        ConflictValidatorDirective,
    ],
    providers: [
        FindRoomDialogService,
    ],
    entryComponents: [
        FindRoomDialog,
    ],
})
export class BookingFindRoomModule { }
