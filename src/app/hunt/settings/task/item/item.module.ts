import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { WorkflowModule } from 'core/workflow';
import { Dialog } from 'core/dialogs';

import { TmGridModule } from '../../../components/table.module';
import { ProjectFormViewerModule } from '../../../project/application/form/shared/form-viewer.module';
import { PipesModule } from '../../shared/common-pipes';
import { TaskFormViewerModule } from '../shared/form-viewer.module';
import { TaskItemComponent } from './item.component';
import { ProjectSelectComponent } from './project-select.component';
import { ProjectListComponent } from './project-list.component';
import { ProjectItemComponent } from './project-item.component';
import { ProjectOptionDialog } from './project-option.dialog';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes);
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        WorkflowModule,
        TaskFormViewerModule,
        FormsModule,
        CommonDirectivesModule,
        NgSelectModule,
        PipesModule,
        ProjectFormViewerModule,
        FontAwesomeModule,
        TmGridModule,
    ],
    declarations: [
        TaskItemComponent,
        ProjectSelectComponent,
        ProjectOptionDialog,
        ProjectListComponent,
        ProjectItemComponent,
    ],
    exports: [
        TaskItemComponent,
        ProjectSelectComponent,
        ProjectListComponent,
        ProjectItemComponent,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        ProjectOptionDialog,
    ],
})
export class TaskItemModule { }
