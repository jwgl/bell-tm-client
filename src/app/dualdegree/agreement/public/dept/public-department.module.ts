import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';

import { PublicDepartmentService } from './public.service';

import { PublicDepartmentComponent } from './public-list.component';
import { PublicDepartmentRoutingModule } from './public-department-routing.module';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        PublicDepartmentRoutingModule,
    ],
    declarations: [
        PublicDepartmentComponent,
    ],
    providers: [
        PublicDepartmentService,
        {provide: 'PUBLIC_DEPARTMENT_API_URL', useValue: '/api/dualdegree/departments/${departmentId}/agreements' },
    ],
})
export class PubliDepartmentcModule {}
