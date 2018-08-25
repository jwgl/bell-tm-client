import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { BookingSharedModule } from '../../shared/booking-shared.module';
import { BookingFormSelectDialog } from './form-select.dialog';
import { BookingReportEditorComponent } from './report-editor.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        CommonDirectivesModule,
        BookingSharedModule,
    ],
    declarations: [
        BookingReportEditorComponent,
        BookingFormSelectDialog,
    ],
    exports: [
        BookingReportEditorComponent,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        BookingFormSelectDialog,
    ],
})
export class BookingReportEditorModule { }
