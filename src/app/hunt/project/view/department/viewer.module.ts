import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDepartmentRoutingModule } from './viewer-routing.module';
import { ProjectDepartmentService } from './viewer.service';
import { ProjectDepartmentListModule } from './list/project-list.module';
import { ProjectDepartmentItemModule } from './item/project-item.module';

@NgModule({
    imports: [
        CommonModule,
        ProjectDepartmentRoutingModule,
        ProjectDepartmentListModule,
        ProjectDepartmentItemModule,
    ],
    providers: [
        ProjectDepartmentService,
        { provide: 'PROJECT_API_URL', useValue: '/api/hunt/checkers/${userId}/projects' },
    ],
})
export class ProjectDepartmentModule { }
