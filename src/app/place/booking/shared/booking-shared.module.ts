import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { CommonDirectivesModule } from 'core/common-directives';

import { BookingFormViewerComponent } from './form-viewer.component';
import { BookingFormOverlayComponent } from './form-overlay.component';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        CommonDirectivesModule,
    ],
    declarations: [
        BookingFormViewerComponent,
        BookingFormOverlayComponent,
    ],
    exports: [
        BookingFormViewerComponent,
        BookingFormOverlayComponent,
    ],
})
export class BookingSharedModule { }
