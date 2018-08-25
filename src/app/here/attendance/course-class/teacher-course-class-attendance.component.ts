import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CourseClassAttendanceService } from './course-class-attendance.service';

@Component({
    templateUrl: 'teacher-course-class-attendance.component.html',
})
export class TeacherCourseClassAttendanceComponent {
    terms: number[];
    selectedTerm: number;
    courseClasses: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: CourseClassAttendanceService,
    ) {
        this.service.loadTerms().subscribe(terms => {
            this.terms = terms;
            if (this.router.url.endsWith('/courseClasses')) {
                this.selectedTerm = terms[0];
                this.loadCourseClass(true);
            }
        });

        this.service.courseClassLoaded.subscribe(courseClass => {
            if (courseClass.termId !== this.selectedTerm) {
                this.selectedTerm = courseClass.termId;
                this.loadCourseClass(false);
            }
        });
    }

    loadCourseClass(navigate: boolean) {
        this.service.loadCourseClasses(this.selectedTerm).subscribe(courseClasses => {
            this.courseClasses = courseClasses;
            if (navigate) {
                this.router.navigate([this.courseClasses[0].id], {relativeTo: this.route});
            }
        });
    }
}
