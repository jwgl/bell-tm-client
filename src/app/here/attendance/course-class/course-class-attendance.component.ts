import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { Subject } from 'rxjs';

import { RollcallDetail, Student, StudentLeaveDetail } from '../shared/attendance.model';
import { CourseClass } from './course-class-attendance.model';
import { CourseClassAttendanceService } from './course-class-attendance.service';

@Component({
    styleUrls: ['course-class-attendance.component.scss'],
    templateUrl: 'course-class-attendance.component.html',
})
export class CourseClassAttendanceComponent {
    courseClass: CourseClass;
    isAdmin = false;

    constructor(
        private route: ActivatedRoute,
        private service: CourseClassAttendanceService,
    ) {
        this.route.params.subscribe(params => {
            if (params['teacherId']) {
                this.service.teacherId = params['teacherId'];
                this.isAdmin = true;
            }
            this.service.loadCourseClass(params['id']).subscribe(dto => {
                this.courseClass = new CourseClass(dto);
                this.service.teacherId = this.courseClass.teacherId;
                this.service.courseClassLoaded.next(this.courseClass);
            });
        });
    }

    toggle(subject: Subject<void>, student: Student): void {
        if (student.rollcalls || student.leaves) {
            subject.next();
        } else {
            this.service.getStudentAttendances(this.courseClass.id, student.id).subscribe(dto => {
                student.rollcalls = dto.rollcalls.map((a: any) => new RollcallDetail(a));
                student.leaves = dto.leaves.map((a: any) => new StudentLeaveDetail(a));
                subject.next();
            });
        }
    }

    disqualify(student: Student): void {
        this.service.disqualify(this.courseClass.id, student.id, student.disqualified).subscribe(dto => {
            student.disqualified = !student.disqualified;
        }, error => {
            if (this.isAdmin) {
                alert(`${error.json().message}。`);
            } else {
                alert(`${error.json().message}，请与学院教务秘书联系。`);
            }
        });
    }

    get reportUrl() {
        return this.service.getReportUrl();
    }
}
