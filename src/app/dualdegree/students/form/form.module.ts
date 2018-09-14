import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { StudentAbroadFormListModule } from './list/form-list.module';
import { StudentAdminRoutingModule } from './form-routing.module';
import { StudentAdminFormService } from './form.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        StudentAdminRoutingModule,
        StudentAbroadFormListModule,
    ],
    providers: [
        StudentAdminFormService,
        { provide: 'STUDENT_API_URL', useValue: '/api/dualdegree/departments/${departmentId}/students' },
    ],
})
export class StudentAbroadFormModule {}
