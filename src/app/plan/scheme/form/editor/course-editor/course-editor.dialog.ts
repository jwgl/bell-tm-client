import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { EditMode } from 'core/constants';
import { BaseDialog } from 'core/dialogs';

import { buildPeriodWeeksOptions, getPeriodWeeks } from '../../../../shared/utils';
import { CourseSelectDto, SchemeCourseDto } from '../../../shared/scheme.model';

@Component({
    templateUrl: 'course-editor.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class CourseEditorDialog extends BaseDialog {
    title: string;
    schemeCourse = new Object() as SchemeCourseDto;
    periodWeekOptions = [] as Array<{ label: string, value: number }>;
    lastPeriodWeeks: number;

    constructor() {
        super();
    }

    onCourseSelected(course: CourseSelectDto): void {
        if (course) {
            this.schemeCourse.courseId = course.id;
            this.schemeCourse.courseName = course.name;
            this.schemeCourse.credit = course.credit;
            this.schemeCourse.practiceCredit = 0;
            this.schemeCourse.theoryPeriod = course.theoryPeriod;
            this.schemeCourse.experimentPeriod = course.experimentPeriod;
            this.schemeCourse.periodWeeks = course.periodWeeks === 0 ? getPeriodWeeks(this.options.terms[0]) : course.periodWeeks;
            this.schemeCourse.assessType = course.assessType;
            this.schemeCourse.isTempCourse = course.isTempCourse;
        } else {
            this.schemeCourse.courseId = null;
            this.schemeCourse.courseName = null;
            this.schemeCourse.isTempCourse = true;
        }
    }

    onChangeSuggestedTerm(value: string) {
        if (value) {
            const term = parseInt(value, 10);
            const periodWeeks = getPeriodWeeks(term);
            if (this.lastPeriodWeeks !== periodWeeks) {
                this.periodWeekOptions = buildPeriodWeeksOptions(term);
                this.lastPeriodWeeks = periodWeeks;
                if (this.schemeCourse.periodWeeks === 0) {
                    this.schemeCourse.periodWeeks = periodWeeks;
                }
            }

            if (!this.schemeCourse.id) {
                this.schemeCourse.displayOrder = this.getTermOrder(term) * 100;
            }
        }
    }

    protected onOpening(): Observable<any> {
        if (this.options.editMode === EditMode.Create) {
            this.title = `添加课程 - ${this.options.group.name}`;
            this.schemeCourse = this.defaultCourse();
        } else {
            this.title = `编辑课程 - ${this.options.group.name}`;
            this.schemeCourse = this.options.dto;
        }
        this.onChangeSuggestedTerm(`${this.schemeCourse.suggestedTerm}`);
        return null;
    }

    protected onConfirmed() {
        this.schemeCourse.suggestedTerm = parseInt(`${this.schemeCourse.suggestedTerm}`, 10);
        return this.schemeCourse;
    }

    private defaultCourse(): SchemeCourseDto {
        const term = this.options.terms[0];
        return {
            courseId: null,
            courseName: null,
            credit: 0,
            isTempCourse: true,
            propertyId: 1,
            practiceCredit: 0,
            suggestedTerm: term,
            theoryPeriod: 0,
            experimentPeriod: 0,
            periodWeeks: getPeriodWeeks(term),
            allowedTerm: 1,
            assessType: 1,
            displayOrder: this.getTermOrder(term) * 100,
            previousId: null,
            reviseVersion: null,
        };
    }

    private getTermOrder(term: number): number {
        return (this.options.terms as number[]).indexOf(term);
    }
}
