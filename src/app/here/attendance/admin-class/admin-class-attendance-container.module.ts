import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';

import { AdminClassAttendanceModule } from './admin-class-attendance.module';
import { AdminClassAttendanceContainerRoutingModule } from './admin-class-attendance-container.routing';
import { AdminClassAttendanceContainerComponent } from './admin-class-attendance-container.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        AdminClassAttendanceModule,
        AdminClassAttendanceContainerRoutingModule,
    ],
    declarations: [
        AdminClassAttendanceContainerComponent,
    ],
})
export class AdminClassAttendanceContainerModule { }
