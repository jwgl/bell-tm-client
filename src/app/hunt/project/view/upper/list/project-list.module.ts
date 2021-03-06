import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { TmGridModule } from '../../../../components/table.module';
import { PipesModule } from '../../../../settings/shared/common-pipes';
import { ProjectListComponent } from './project-list.component';
import { ProjectOptionDialog } from './project-option.dialog';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        CommonDirectivesModule,
        NgSelectModule,
        PipesModule,
        TmGridModule,
    ],
    declarations: [
        ProjectListComponent,
        ProjectOptionDialog,
    ],
    exports: [
        ProjectListComponent,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        ProjectOptionDialog,
    ],
})
export class ProjectListModule { }
