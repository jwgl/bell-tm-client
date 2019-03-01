import { Component, ElementRef, AfterViewInit, EventEmitter, Output, ViewChild } from '@angular/core';

import { switchMap } from 'rxjs/operators';

import { Http } from 'core/rest';
import { typeahead } from 'core/utils/typeahead';

@Component({
    selector: 'tm-department-teacher-select',
    styleUrls: ['common.shared.scss.scss'],
    templateUrl: 'department-teacher-select.component.html',
})
export class DepartmentTeacherSelectComponent implements AfterViewInit {
    @ViewChild('search') input: ElementRef;
    @ViewChild('dropdown') dropdown: ElementRef;
    @Output() selectTeacher: EventEmitter<any> = new EventEmitter<any>();

    teachers: any[];
    teacher: any;

    constructor(private http: Http) { }

    teacherSelected(teacher: any) {
        this.selectTeacher.emit(teacher);
        this.teacher = teacher;
    }

    ngAfterViewInit() {
        $(this.dropdown.nativeElement).on('shown.bs.dropdown', () => {
            this.input.nativeElement.focus();
        });
        typeahead(this.input).pipe(
            switchMap(value => this.http.get<any[]>(`/api/steer/teachers?q=${encodeURIComponent(value)}`))
        ).subscribe(value => this.teachers = value);
    }

    get result(): string {
        if (!this.teacher) {
            return '教师姓名';
        } else {
            return `${this.teacher.id} : ${this.teacher.name}`;
        }
    }

    clearTeacher(): void {
        this.selectTeacher.emit(null);
        this.teacher = null;
    }
}
