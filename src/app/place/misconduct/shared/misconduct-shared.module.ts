import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';

import { BookingViewerComponent } from './booking-viewer.component';
import { MisconductViewerComponent } from './misconduct-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
    ],
    declarations: [
        BookingViewerComponent,
        MisconductViewerComponent,
    ],
    exports: [
        BookingViewerComponent,
        MisconductViewerComponent,
    ]
})
export class MisconductSharedModule { }
