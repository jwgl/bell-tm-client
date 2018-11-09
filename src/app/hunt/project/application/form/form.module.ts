import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowModule } from 'core/workflow';

import { RoutingModule } from './form-routing.module';
import { ProjectFormEditorModule } from './editor/form-editor.module';
import { ProjectFormService } from './form.service';
import { ProjectFormItemModule } from './item/item.module';
import { ProjectListModule } from './list/form-list.module';
import { TaskModule } from './reviewtask/task.module';

@NgModule({
    imports: [
        CommonModule,
        ProjectFormEditorModule,
        WorkflowModule.forSubmit(ProjectFormService),
        ProjectFormItemModule,
        ProjectListModule,
        RoutingModule,
        TaskModule,
        WorkflowModule,
    ],
    providers: [
        ProjectFormService,
        { provide: 'PROJECT_API_URL', useValue: '/api/hunt/teachers/${userId}/applications' },
        { provide: 'TASK_API_URL', useValue: '/api/hunt/settings/tasks' },
        { provide: 'TASKPUBLIC_API_URL', useValue: '/api/hunt/teachers/${userId}/tasks' },
    ],
})
export class ProjectModule { }
