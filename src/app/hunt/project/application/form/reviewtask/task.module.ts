import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { PipesModule } from '../../../../settings/shared/common-pipes';
import { TaskFormViewerModule } from '../../../../settings/task/shared/form-viewer.module';

import { TaskItemComponent} from './item';
import { TaskListComponent } from './list';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        TaskFormViewerModule,
        RouterModule,
        PipesModule,
    ],
    declarations: [
        TaskItemComponent,
        TaskListComponent,
    ],
    exports: [
        TaskItemComponent,
        TaskListComponent,
    ],
})
export class TaskModule {}
