import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { PipesModule } from '../../../../settings/shared/common-pipes';
import { ProjectDepartmentListComponent } from './project-list.component';
import { ProjectOptionDialog } from './project-option.dialog';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        CommonDirectivesModule,
        NgSelectModule,
        PipesModule,
    ],
    declarations: [
        ProjectDepartmentListComponent,
        ProjectOptionDialog,
    ],
    exports: [
        ProjectDepartmentListComponent,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        ProjectOptionDialog,
    ],
})
export class ProjectDepartmentListModule { }
