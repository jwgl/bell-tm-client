import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { ReissueFormViewerComponent } from './form-viewer.component';
import { ReissueFormOverlayComponent } from './form-overlay.component';
import { StudentInfoComponent } from './student-info.component';
import { FormStatusPipe } from './form-status.pipe';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
    ],
    declarations: [
        StudentInfoComponent,
        ReissueFormViewerComponent,
        ReissueFormOverlayComponent,
        FormStatusPipe,
    ],
    exports: [
        StudentInfoComponent,
        ReissueFormViewerComponent,
        ReissueFormOverlayComponent,
        FormStatusPipe,
    ],
})
export class ReissueSharedModule { }
