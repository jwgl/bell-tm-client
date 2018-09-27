import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorRoutingModule } from './form-routing.module';
import { MentorFormService } from './form.service';
import { MentorFormListModule } from './list/form-list.module';

@NgModule({
    imports: [
        CommonModule,
        MentorRoutingModule,
        MentorFormListModule,
    ],
    providers: [
        MentorFormService,
        { provide: 'MENTOR_API_URL', useValue: '/api/dual/departments/${departmentId}/mentors' },
    ],
})
export class MentorFormModule { }
