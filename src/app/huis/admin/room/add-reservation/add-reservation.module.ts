import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';

import { AddReservationDialog } from './add-reservation.dialog';
import { AddReservationDialogService } from './add-reservation.service';
import { HuisSharedModule } from 'app/huis/shared/huis-shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        HuisSharedModule,
    ],
    declarations: [
        AddReservationDialog,
    ],
    providers: [
        AddReservationDialogService,
    ],
    entryComponents: [
        AddReservationDialog,
    ],
})
export class AddReservationModule { }
