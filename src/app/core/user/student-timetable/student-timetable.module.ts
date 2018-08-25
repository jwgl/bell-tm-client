import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';

import { StudentTimetableRoutingModule } from './student-timetable.routing';
import { StudentTimetableComponent } from './student-timetable.component';
import { StudentTimetableService } from './student-timetable.service';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        StudentTimetableRoutingModule
    ],
    declarations: [
        StudentTimetableComponent,
    ],
    providers: [
        StudentTimetableService,
        { provide: 'STUDENT_TIMETABLE_API_URL', useValue: '/api/core/students/${userId}/schedules' }
    ],
})
export class StudentTimetableModule { }
