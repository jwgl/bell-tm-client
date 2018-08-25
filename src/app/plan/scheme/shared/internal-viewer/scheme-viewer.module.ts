import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlanSharedModule } from '../../../shared/module';
import { SchemeSharedModule } from '../scheme.module';
import { SchemeCourseComponent } from './scheme-course.component';
import { SchemeGroupComponent } from './scheme-group.component';
import { SchemePropertyComponent } from './scheme-property.component';
import { SchemeShowDiffButton } from './scheme-show-diff.button';
import { SchemeSummaryComponent } from './scheme-summary.component';
import { SchemeTableComponent } from './scheme-table.component';
import { SchemeViewerComponent } from './scheme-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        PlanSharedModule,
        SchemeSharedModule,
    ],
    declarations: [
        SchemeCourseComponent,
        SchemeGroupComponent,
        SchemePropertyComponent,
        SchemeSummaryComponent,
        SchemeTableComponent,
        SchemeViewerComponent,
        SchemeShowDiffButton,
    ],
    exports: [
        SchemeViewerComponent,
        SchemeShowDiffButton,
    ],
})
export class SchemeInternalViewerModule { }
