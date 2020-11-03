import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommonDirectivesModule } from 'core/common-directives';

import { PlaceFormViewerComponent } from './form-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
    ],
    declarations: [
        PlaceFormViewerComponent,
    ],
    exports: [
        PlaceFormViewerComponent,
    ],
})
export class PlaceFormViewerModule { }
