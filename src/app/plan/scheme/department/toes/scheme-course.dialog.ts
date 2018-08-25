import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BaseDialog } from 'core/dialogs';
import { Http } from 'core/rest';

@Component({
    templateUrl: 'scheme-course.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class SchemeCourseDialog extends BaseDialog {
    startWeek: number;
    department: any;
    schemeCourse: any;
    constructor(private http: Http) {
        super();
    }

    get startWeeks(): number[] {
        if (this.schemeCourse.isPracticeCourse) {
            return [];
        } else if (this.schemeCourse._periodWeeks > 9) {
            return [1];
        } else if (this.schemeCourse._periodWeeks === 9) {
            return [1, 9];
        } else {
            const starts: number[] = [];
            for (let i = 1; i <= 18 - this.schemeCourse._periodWeeks; i++) {
                starts.push(i);
            }
            return starts;
        }
    }

    getEndWeek(startWeek: number, length: number): number {
        if (length === 18) {
            return 17;
        } else {
            return startWeek + length - 1;
        }
    }

    protected onOpening(): Observable<any> {
        this.schemeCourse = this.options.schemeCourse;
        this.startWeek = this.schemeCourse.startWeek;
        return this.http.get('/api/core/departments?q=t').pipe(tap((departments: any[]) => {
            this.department = departments.find(it => it.id === this.schemeCourse.departmentId);
        }));
    }

    protected onConfirmed() {
        return {
            startWeek: this.startWeek,
            departmentId: this.department.id,
            departmentName: this.department.name,
        };
    }
}
