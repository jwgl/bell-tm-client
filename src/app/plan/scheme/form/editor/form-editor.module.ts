import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';

import { PlanSharedModule } from '../../../shared/module';
import { SchemeSharedModule } from '../../shared/scheme.module';
import { CourseEditorModule } from './course-editor/course-editor.module';
import { SchemeFormEditorComponent } from './form-editor.component';
import { SchemeCourseComponent } from './scheme-course.component';
import { SchemeGroupComponent } from './scheme-group.component';
import { SchemePropertyComponent } from './scheme-property.component';
import { SchemeSummaryComponent } from './scheme-summary.component';
import { SchemeFormTableComponent } from './scheme-table.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PlanSharedModule,
        SchemeSharedModule,
        CommonDialogsModule,
        CourseEditorModule,
    ],
    declarations: [
        SchemeFormEditorComponent,
        SchemeFormTableComponent,
        SchemePropertyComponent,
        SchemeGroupComponent,
        SchemeCourseComponent,
        SchemeSummaryComponent,
    ],
    exports: [
        SchemeFormEditorComponent,
    ],
})
export class SchemeFormEditorModule { }
