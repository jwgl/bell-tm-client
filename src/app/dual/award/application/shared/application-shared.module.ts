import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import { CommonDirectivesModule } from 'core/common-directives';

import { DualAuditStatusComponent } from './audit-status.component';
import { PipesModule } from './common-pipes';
import { ApplicationFormViewerComponent } from './form-viewer.component';
import { MentorSelectDialog } from './mentor/mentor-select.dialog';

import { ApplicationFormOverlayComponent } from './overlay/form-overlay.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        PipesModule,
        FormsModule,
        OverlayModule,
    ],
    declarations: [
        ApplicationFormViewerComponent,
        DualAuditStatusComponent,
        MentorSelectDialog,
        ApplicationFormOverlayComponent,
    ],
    entryComponents: [
        MentorSelectDialog,
    ],
    exports: [
        ApplicationFormViewerComponent,
        DualAuditStatusComponent,
        MentorSelectDialog,
        ApplicationFormOverlayComponent,
    ],
})
export class ApplicationSharedModule { }
