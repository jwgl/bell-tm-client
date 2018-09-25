import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentAbroadFormListModule } from './list/form-list.module';
import { StudentAdminRoutingModule } from './form-routing.module';
import { StudentAdminFormService } from './form.service';

@NgModule({
    imports: [
        CommonModule,
        StudentAdminRoutingModule,
        StudentAbroadFormListModule,
    ],
    providers: [
        StudentAdminFormService,
        { provide: 'STUDENT_API_URL', useValue: '/api/dual/departments/${departmentId}/students' },
    ],
})
export class StudentAbroadFormModule {}
