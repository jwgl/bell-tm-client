import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskFormViewerModule } from './shared/form-viewer.module';

import { TaskFormEditorModule } from './editor/form-editor.module';
import { BatchRoutingModule } from './task-routing.module';
import { FormService } from './form.service';
import { TaskItemModule } from './item/item.module';
import { TaskFormListModule } from './list/form-list.module';

@NgModule({
    imports: [
        CommonModule,
        TaskFormViewerModule,
        BatchRoutingModule,
        TaskFormEditorModule,
        TaskItemModule,
        TaskFormListModule,
    ],
    providers: [
        FormService,
        { provide: 'TASK_API_URL', useValue: '/api/hunt/settings/tasks' },
    ],
})
export class TaskFormModule {}
