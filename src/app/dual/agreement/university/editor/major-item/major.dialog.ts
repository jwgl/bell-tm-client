import {Component} from '@angular/core';

import {Observable} from 'rxjs';

import {BaseDialog} from 'core/dialogs';

@Component({
    templateUrl: 'major.dialog.html',
})
export class MajorDialog extends BaseDialog {
    id: string;
    nameEn: string;
    nameCn: string;
    bachelor: string;

    constructor() {
        super();
    }

    filterByGrade(grade: number) {
        return (major: any) => major.grade === grade;
    }

    filterByDepartment(name: string) {
        return (major: any) => major.departmentName === name;
    }

    protected onOpening(): Observable<any> {
        if (this.options) {
            this.id = this.options.id;
            this.nameCn = this.options.nameCn;
            this.nameEn = this.options.nameEn;
            this.bachelor = this.options.bachelor;
        }
        return null;
    }

    protected onConfirmed(): any {
        return {
            id: this.id,
            nameEn: this.nameEn,
            nameCn: this.nameCn,
            bachelor: this.bachelor,
        };
    }
}
