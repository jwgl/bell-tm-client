import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { BookingSharedModule } from '../../shared/booking-shared.module';
import { BookingFindRoomModule } from './find-room/find-room.module';
import { BookingFormEditorComponent } from './form-editor.component';
import { Workflow2Module } from 'core/workflow2';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        Workflow2Module,
        BookingSharedModule,
        BookingFindRoomModule,
    ],
    declarations: [
        BookingFormEditorComponent,
    ],
    exports: [
        BookingFormEditorComponent,
    ],
})
export class BookingFormEditorModule { }
