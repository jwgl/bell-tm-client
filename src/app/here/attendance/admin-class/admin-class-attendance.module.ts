import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';

import { AdminClassAttendanceComponent } from './admin-class-attendance.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
    ],
    declarations: [
        AdminClassAttendanceComponent,
    ],
    exports: [
        AdminClassAttendanceComponent,
    ],
})
export class AdminClassAttendanceModule { }
