import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { BookingReportListComponent } from './report-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
    ],
    declarations: [
        BookingReportListComponent,
    ],
    exports: [
        BookingReportListComponent
    ],
})
export class BookingReportListModule { }
