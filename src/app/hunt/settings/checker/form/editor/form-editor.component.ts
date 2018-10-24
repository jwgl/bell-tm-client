import {Component} from '@angular/core';

import {Observable} from 'rxjs';

import {BaseDialog} from 'core/dialogs';

import {CheckerForm} from '../../shared/form.model';
import {CheckerFormService} from '../form.service';
import './form-editor.model';

@Component({
    templateUrl: 'form-editor.component.html',
})
// tslint:disable-next-line:component-class-suffix
export class CheckerFormDialog extends BaseDialog {
    departments: any[];
    form: CheckerForm;
    teacher: any;
    editMode: boolean;

    constructor(private service: CheckerFormService) {
        super();
        this.form = new CheckerForm([]);
    }

    onTeacherSelected(teacher: any): void {
        this.teacher = teacher;
    }

    protected onOpening(): Observable<any> {
        this.service.loadDataForCreate().subscribe((dto: any) => {
            this.departments = dto.departments;
        });
        this.editMode = this.options.editMode;
        return null;
    }

    protected onConfirmed(): any {
        if (!this.editMode) {
            this.form.teacherId = this.teacher.id;
        }
        return this.form.toServerDto();
    }

}
