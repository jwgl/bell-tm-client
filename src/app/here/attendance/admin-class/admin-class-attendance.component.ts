import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject, iif } from 'rxjs';

import { RollcallDetail, Student, StudentLeaveDetail } from '../shared/attendance.model';
import { AdminClassAttendanceService } from './admin-class-attendance.service';

@Component({
    styleUrls: ['admin-class-attendance.component.scss'],
    templateUrl: 'admin-class-attendance.component.html',
})
export class AdminClassAttendanceComponent {
    students: Student[];
    termId: number;

    constructor(
        private route: ActivatedRoute,
        private service: AdminClassAttendanceService,
    ) {
        this.route.params.subscribe(params => {
            this.termId = +params['termId'];
            iif(() => params['id'] === 'all',
                this.service.loadAll(this.termId),
                this.service.loadList(this.termId, +params['id']),
            ).subscribe(dto => this.onLoadData(dto));
        });
    }

    onLoadData(data: any[]) {
        this.students = data.map((s: any) => new Student(s));
    }

    toggle(subject: Subject<void>, student: Student): void {
        if (student.rollcalls || student.leaves) {
            subject.next();
        } else {
            this.service.loadItem(this.termId, student.id).subscribe(dto => {
                student.rollcalls = dto.rollcalls.map((a: any) => new RollcallDetail(a));
                student.leaves = dto.leaves.map((a: any) => new StudentLeaveDetail(a));
                subject.next();
            });
        }
    }
}
