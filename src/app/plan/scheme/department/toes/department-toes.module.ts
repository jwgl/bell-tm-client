import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { PlanSharedModule } from '../../../shared/module';
import { SchemeSharedModule } from '../../shared/scheme.module';
import { SchemeDepartmentToesComponent } from './department-toes.component';
import { PropertyToesPipe } from './property-toes.pipe';
import { SchemeCourseToesPipe } from './scheme-course-toes.pipe';
import { SchemeCourseToesComponent } from './scheme-course.component';
import { SchemeCourseDialog } from './scheme-course.dialog';
import { SchemePropertyToesComponent } from './scheme-property.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        PlanSharedModule,
        SchemeSharedModule,
    ],
    declarations: [
        SchemeDepartmentToesComponent,
        SchemeCourseToesComponent,
        PropertyToesPipe,
        SchemeCourseToesPipe,
        SchemeCourseDialog,
        SchemePropertyToesComponent,
    ],
    exports: [
        SchemeDepartmentToesComponent,
    ],
    entryComponents: [
        SchemeCourseDialog,
    ],
})
export class SchemeDepartmentToesModule { }
