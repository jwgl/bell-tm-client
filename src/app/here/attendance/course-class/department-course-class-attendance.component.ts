import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DepartmentCourseClassAttendanceService } from './department-course-class-attendance.service';

@Component({
    templateUrl: 'department-course-class-attendance.component.html',
})
export class DepartmentCourseClassAttendanceComponent {
    terms: number[];
    selectedTerm: number;
    teachers: any[];
    courseClasses: any[];
    departmentId: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: DepartmentCourseClassAttendanceService,
    ) {
        this.departmentId = this.route.snapshot.params['departmentId'];

        this.service.loadTerms().subscribe(terms => {
            this.terms = terms;
            if (this.router.url.endsWith('/courseClasses')) {
                this.selectedTerm = terms[0];
                this.loadTeachers(true);
            }
        });

        this.service.courseClassLoaded.subscribe(courseClass => {
            if (courseClass.termId !== this.selectedTerm) {
                this.selectedTerm = courseClass.termId;
                this.loadTeachers(false, courseClass.teacherId);
            }
        });
    }

    loadTeachers(navigate: boolean, teacherId: string = null): void {
        this.service.loadCourseClassTeachers(this.selectedTerm).subscribe(teachers => {
            this.teachers = teachers;
            if (navigate) {
                if (this.teachers.length > 0) {
                    this.teacherId = this.teachers[0].id;
                    this.loadCourseClasses(navigate);
                }
            } else {
                this.teacherId = teacherId;
                this.loadCourseClasses(navigate);
            }
        });
    }

    loadCourseClasses(navigate = false): void {
        this.service.loadCourseClasses(this.selectedTerm).subscribe(courseClasses => {
            this.courseClasses = courseClasses;
            if (navigate) {
                this.router.navigate([
                    '/here/departments',
                    this.departmentId,
                    'courseClasses',
                    { teacherId: this.teacherId },
                    this.courseClasses[0].id],
                );
            }
        });
    }

    get teacherId(): string {
        return this.service.teacherId;
    }

    set teacherId(value: string) {
        this.service.teacherId = value;
    }
}
