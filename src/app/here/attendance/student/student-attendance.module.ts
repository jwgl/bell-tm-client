import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';

import { StudentAttendanceRoutingModule } from './student-attendance.routing';
import { StudentAttendanceComponent } from './student-attendance.component';
import { StudentAttendanceService } from './student-attendance.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        StudentAttendanceRoutingModule,
    ],
    declarations: [
        StudentAttendanceComponent,
    ],
    providers: [
        StudentAttendanceService,
        { provide: 'STUDENT_ATTENDANCE_API_URL', useValue: '/api/here/students/${userId}/attendances' }
    ],
})
export class StudentAttendanceModule { }
