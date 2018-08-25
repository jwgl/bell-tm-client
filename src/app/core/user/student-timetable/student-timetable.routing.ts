import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentTimetableComponent } from './student-timetable.component';

const routes: Routes = [{
    path: '', component: StudentTimetableComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class StudentTimetableRoutingModule { }
