import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowModule } from 'core/workflow';

import { InspectModule } from './inspect/inspect.module';
import { RoutingModule } from './form-routing.module';
import { ProjectFormEditorModule } from './editor/form-editor.module';
import { ProjectFormService } from './form.service';
import { ProjectFormItemModule } from './item/item.module';
import { ProjectListModule } from './list/form-list.module';
import { TaskModule } from './reviewtask/task.module';
import { FunViewModule } from './fund/fund-view.module';

@NgModule({
    imports: [
        CommonModule,
        ProjectFormEditorModule,
        WorkflowModule.forSubmit(ProjectFormService),
        ProjectFormItemModule,
        ProjectListModule,
        RoutingModule,
        TaskModule,
        InspectModule,
        WorkflowModule,
        FunViewModule,
    ],
    providers: [
        ProjectFormService,
        { provide: 'PROJECT_API_URL', useValue: '/api/hunt/teachers/${userId}/applications' },
        { provide: 'TASKPUBLIC_API_URL', useValue: '/api/hunt/teachers/${userId}/tasks' },
    ],
})
export class ProjectModule { }
