import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { BookingSharedModule } from '../../shared/booking-shared.module';
import { BookingReportItemComponent } from './report-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        OverlayModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        BookingSharedModule,
    ],
    declarations: [
        BookingReportItemComponent,
    ],
    exports: [
        BookingReportItemComponent,
    ],
})
export class BookingReportItemModule { }
