import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowModule } from 'core/workflow';

import { ProjectDepartmentRoutingModule } from './viewer-routing.module';
import { ProjectDepartmentService } from './viewer.service';
import { ChangeFormService } from './form.service';
import { ProjectDepartmentListModule } from './list/project-list.module';
import { ProjectDepartmentItemModule } from './item/project-item.module';
import { ChangeFormModule } from './replace-principal/form.module';
import { FunViewModule } from '../../application/form/fund/fund-view.module';

@NgModule({
    imports: [
        CommonModule,
        WorkflowModule.forSubmit(ChangeFormService),
        ProjectDepartmentRoutingModule,
        ProjectDepartmentListModule,
        ProjectDepartmentItemModule,
        ChangeFormModule,
        WorkflowModule,
        FunViewModule,
    ],
    providers: [
        ProjectDepartmentService,
        ChangeFormService,
        { provide: 'PROJECT_API_URL', useValue: '/api/hunt/checkers/${userId}/projects' },
        { provide: 'CHANGE_API_URL', useValue: '/api/hunt/checkers/${userId}/principalChanges' },
    ],
})
export class ProjectDepartmentModule { }
