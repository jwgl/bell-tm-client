import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { TmGridModule } from '../../../../components/table.module';
import { PipesModule } from '../../../../settings/shared/common-pipes';
import { ProjectTeacherListComponent } from './project-list.component';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
        PipesModule,
        TmGridModule,
    ],
    declarations: [
        ProjectTeacherListComponent,
    ],
    exports: [
        ProjectTeacherListComponent,
    ],
})
export class ProjectTeacherListModule { }
