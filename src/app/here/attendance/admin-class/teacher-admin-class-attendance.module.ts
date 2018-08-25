import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';

import { AdminClassAttendanceService } from './admin-class-attendance.service';
import { AdminClassAttendanceContainerModule } from './admin-class-attendance-container.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        AdminClassAttendanceContainerModule,
    ],
    providers: [
        AdminClassAttendanceService,
        { provide: 'ADMIN_CLASS_ATTENDANCE_API_URL', useValue: '/api/here/teachers/${userId}/adminClasses' },
        { provide: 'ATTENDANCE_API_URL', useValue: '/api/here/attendances' },
        { provide: 'IS_ATTENDANCE_ADMIN', useValue: false },
    ],
})
export class TeacherAdminClassAttendanceModule { }
