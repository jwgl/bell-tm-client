import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, AfterViewInit } from '@angular/core';

import { Observable, fromEvent, merge, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';

import * as _ from 'lodash';

import { EditMode } from 'core/constants';

import { AbstractGroup, CourseSelectDto, SchemeCourse } from '../../../shared/scheme.model';
import { SchemeFormService } from '../../scheme-form.service';

@Component({
    selector: 'tm-course-select',
    styleUrls: ['course-select.component.scss'],
    templateUrl: 'course-select.component.html',
})
export class CourseSelectComponent implements AfterViewInit {
    @ViewChild('search') input: ElementRef;
    @ViewChild('dropdown') dropdown: ElementRef;

    @Input() editMode: EditMode;
    @Input() courseId: string;
    @Input() isTempCourse: boolean;
    @Input() group: AbstractGroup;
    @Output() selectCourse = new EventEmitter<any>();

    courses: any;
    query: any;

    constructor(private service: SchemeFormService) { }

    ngAfterViewInit() {
        $(this.dropdown.nativeElement).on('shown.bs.dropdown', () => {
            this.input.nativeElement.focus();
        });

        combineLatest(
            merge(
                fromEvent(this.input.nativeElement, 'compositionstart').pipe(map(() => true)),
                fromEvent(this.input.nativeElement, 'compositionend').pipe(map(() => false)),
            ).pipe(startWith(false)),
            fromEvent(this.input.nativeElement, 'keyup'),
        ).pipe(
            filter(array => !array[0]),
            map(array => array[1]),
            map((event: KeyboardEvent) => (event.target as HTMLInputElement).value),
            debounceTime(250),
            distinctUntilChanged(),
            filter(value => value.length >= 2),
            switchMap(value => this.search(value))
        ).subscribe(value => {
            this.query = value.query;
            // 过滤已选择的课程
            this.courses = _.differenceWith(value.result, this.group.courses, (a: CourseSelectDto, b: SchemeCourse) => {
                return a.id === b._courseId;
            });
        });
    }

    search(query: string): Observable<{ query: string, result: CourseSelectDto[] }> {
        const type = this.editMode === EditMode.Create ? 0 : (this.isTempCourse ? 2 : 1);
        return this.service.findCourses(query, type, this.group.property.id).pipe(map(result => ({ query, result })));
    }

    clearCourse() {
        this.selectCourse.emit(null);
    }

    highlight(str: string): string {
        return str.replace(this.query, `<mark>${this.query}</mark>`);
    }

    get result(): string {
        if (!this.courseId) {
            return null;
        } else {
            return this.isTempCourse ? `临时课程（${this.courseId}）` : `${this.courseId}`;
        }
    }

    get clearable(): boolean {
        return this.editMode === EditMode.Create;
    }
}
