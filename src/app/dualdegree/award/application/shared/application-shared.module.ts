import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';

import { DualdegreeAuditStatusComponent } from './audit-status.component';
import { PipesModule } from './common-pipes';
import { ApplicationFormViewerComponent } from './form-viewer.component';
import { MentorSelectDialog } from './mentor/mentor-select.dialog';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        PipesModule,
        FormsModule,
    ],
    declarations: [
        ApplicationFormViewerComponent,
        DualdegreeAuditStatusComponent,
        MentorSelectDialog,
    ],
    entryComponents: [
        MentorSelectDialog,
    ],
    exports: [
        ApplicationFormViewerComponent,
        DualdegreeAuditStatusComponent,
        MentorSelectDialog,
    ],
})
export class ApplicationSharedModule {}
