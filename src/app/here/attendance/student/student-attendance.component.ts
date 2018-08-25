import { Component } from '@angular/core';

import { Label } from 'core/models';

import { RollcallLabels, RollcallType } from '../../rollcall/form/rollcall-form.model';
import { RollcallDetail, Student, StudentLeaveDetail } from '../shared/attendance.model';
import { StudentAttendanceService } from './student-attendance.service';

@Component({
    styleUrls: ['student-attendance.component.scss'],
    templateUrl: 'student-attendance.component.html',
})
export class StudentAttendanceComponent {
    student: Student;

    constructor(private service: StudentAttendanceService) {
        this.service.loadList().subscribe(dto => {
            this.student = new Student({});
            this.student.rollcalls = dto.rollcalls.map((a: any) => new RollcallDetail(a));
            this.student.leaves = dto.leaves.map((a: any) => new StudentLeaveDetail(a));
        }, (error) => {
            if (error.status === 403) {
                alert('无权访问。');
            }
        });
    }

    getLabels(type: RollcallType): Label[] {
        return RollcallLabels[type];
    }
}
