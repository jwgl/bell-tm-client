import {Component} from '@angular/core';

import * as _ from 'lodash';
import {Observable} from 'rxjs';

import {BaseDialog} from 'core/dialogs';

interface AgreementMajor {
    departmentName: string;
    subjectName: string;
    startedGrade: number;
    endedGrade: number;
    coMajors: any[];
}
@Component({
    styleUrls: ['major.dialog.scss'],
    templateUrl: 'major.dialog.html',
})
export class MajorDialog extends BaseDialog {
    majors: any[];
    coMajors: any[];
    items: any[];
    form: AgreementMajor;

    constructor() {
        super();
    }

    filterByDepartment(name: string) {
        return (major: any) => major.departmentName === name;
    }

    check(item: any) {
        item.checked = !item.checked;
    }

    isEmpty(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    validGrade(value: number, start = 2002, end = 9999): boolean {
        return value > start && value < end;
    }

    protected onOpening(): Observable<any> {
        this.items = this.options.items;
        this.majors = this.options.majors;
        this.coMajors = this.options.coMajors;
        this.form = this.options.agreementMajor;
        this.majors = this.majors.filter(data => !this.items.some(it => it === data.id));
        if (!this.isEmpty(this.form.coMajors)) {
            this.coMajors.forEach(it => it.checked = this.form.coMajors.some(s => s.id === it.id));
        }
        return null;
    }

    protected onConfirmed(): any {
        const majorItem = this.majorSelected;
        majorItem.startedGrade = this.form.startedGrade;
        majorItem.endedGrade = this.form.endedGrade;
        majorItem.coMajors = this.coMajors.filter(s => s.checked);
        return majorItem;
    }

    get majorSelected(): any {
        if (this.isEmpty(this.form.startedGrade) || this.isEmpty(this.form.endedGrade) ||
            !this.validGrade(this.form.startedGrade) || !this.validGrade(this.form.endedGrade)
            || this.form.endedGrade < this.form.startedGrade) {
            return null;
        }
        const items = this.majors.filter(major => major.departmentName === this.form.departmentName
            && major.subjectName === this.form.subjectName);
        return items.length ? items[0] : null;
    }
}
