import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';

import { BookingFormViewerComponent } from './form-viewer.component';
import { BookingItemViewerComponent } from './item-viewer.component';
import { Workflow2Module } from 'core/workflow2';
import { HuisSharedModule } from 'app/huis/shared/huis-shared.module';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        Workflow2Module,
        HuisSharedModule,
    ],
    declarations: [
        BookingFormViewerComponent,
        BookingItemViewerComponent,
    ],
    exports: [
        BookingFormViewerComponent,
        BookingItemViewerComponent,
    ],
})
export class BookingSharedModule { }
