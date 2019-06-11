import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Http } from '../rest';
import { typeahead } from '../utils/typeahead';
import { BaseDialog } from './base-dialog';

@Component({
    selector: 'teacher-select-dialog',
    templateUrl: 'teacher-select.dialog.html',
})
export class TeacherSelectDialog extends BaseDialog implements AfterViewInit {
    @ViewChild('search', { static: true })
    input: ElementRef;

    title: string;
    result: { id: string, name: string };
    teachers: any[];

    constructor(private rest: Http) {
        super();
    }

    ngAfterViewInit() {
        typeahead(this.input).pipe(
            switchMap(value => this.rest.get<any[]>(`/api/core/teachers?q=${encodeURIComponent(value)}`))
        ).subscribe(value => this.teachers = value);
    }

    protected onOpening(): Observable<any> {
        this.title = this.options.title || '选择教师';
        return null;
    }

    protected onConfirmed(): any {
        return this.result;
    }
}
