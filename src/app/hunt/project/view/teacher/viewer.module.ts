import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowModule } from 'core/workflow';

import { ProjectTeacherRoutingModule } from './viewer-routing.module';
import { ProjectTeacherService } from './viewer.service';
import { ProjectTeacherListModule } from './list/project-list.module';
import { ProjectTeacherItemModule } from './item/project-item.module';
import { FunViewModule } from '../../application/form/fund/fund-view.module';

@NgModule({
    imports: [
        CommonModule,
        ProjectTeacherRoutingModule,
        ProjectTeacherListModule,
        ProjectTeacherItemModule,
        WorkflowModule,
        FunViewModule,
    ],
    providers: [
        ProjectTeacherService,
        { provide: 'PROJECT_API_URL', useValue: '/api/hunt/teachers/${userId}/projects' },
    ],
})
export class ProjectTeachertModule { }
