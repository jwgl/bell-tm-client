import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeptAdminRoutingModule } from './form-routing.module';
import { DeptAdminFormService } from './form.service';
import { DeptAdminListModule } from './list/from-list.module';

@NgModule({
    imports: [
        CommonModule,
        DeptAdminRoutingModule,
        DeptAdminListModule,
    ],
    providers: [
        DeptAdminFormService,
        { provide: 'DEPARTMENT_API_URL', useValue: '/api/dualdegree/settings/users' },
    ],
})
export class DeptAdminFormModule {}
