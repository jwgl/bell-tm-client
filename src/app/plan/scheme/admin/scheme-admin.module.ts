import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemeAdminRoutingModule } from './scheme-admin.routing';
import { SchemeAdminItemModule } from './item/admin-item.module';
import { SchemeAdminListModule } from './list/admin-list.module';
import { SchemeAdminService } from './scheme-admin.service';

@NgModule({
    imports: [
        CommonModule,
        SchemeAdminRoutingModule,
        SchemeAdminListModule,
        SchemeAdminItemModule,
    ],
    providers: [
        SchemeAdminService,
        { provide: 'SCHEME_ADMIN_API_URL', useValue: '/api/plan/admin/schemes' },
        { provide: 'DEPARTMENT_API_URL', useValue: '/api/plan/departments' },
    ],
})
export class SchemeAdminModule { }
