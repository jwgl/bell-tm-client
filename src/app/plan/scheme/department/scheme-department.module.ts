import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemeDepartmentItemModule } from './item/department-item.module';
import { SchemeDepartmentListModule } from './list/department-list.module';
import { SchemeDepartmentRoutingModule } from './scheme-department.routing';
import { SchemeDepartmentService } from './scheme-department.service';
import { SchemeDepartmentToesModule } from './toes/department-toes.module';

@NgModule({
    imports: [
        CommonModule,
        SchemeDepartmentRoutingModule,
        SchemeDepartmentListModule,
        SchemeDepartmentItemModule,
        SchemeDepartmentToesModule,
    ],
    providers: [
        SchemeDepartmentService,
        { provide: 'SCHEME_DEPARTMENT_API_URL', useValue: '/api/plan/departments/${departmentId}/schemes' },
    ],
})
export class SchemeDepartmentModule { }
