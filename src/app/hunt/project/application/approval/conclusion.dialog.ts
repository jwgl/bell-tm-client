import { Component } from '@angular/core';

import * as dayjs from 'dayjs';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

import { ConclusionForm } from './approval.model';

@Component({
    templateUrl: 'conclusion.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class ConclusionDialog extends BaseDialog {
    conclusionForm: ConclusionForm;
    level: string;
    conclusions: any[];
    projectCycle: number;

    protected onOpening(): Observable<any> {
        this.level = this.options.level;
        this.conclusions = this.options.conclusions;
        this.conclusionForm = new ConclusionForm(this.options.conclusionForm);
        this.projectCycle = this.options.projectCycle;
        return null;
    }

    protected onConfirmed(): any {
        return this.conclusionForm;
    }

    get provinceLevel(): boolean {
        return this.level === 'PROVINCE';
    }

    get finalOk(): boolean {
        return (this.provinceLevel && this.conclusionForm.conclusionOfProvince === 'OK') ||
            (this.level === 'UNIVERSITY' && this.conclusionForm.conclusionOfUniversity === 'OK');
    }

    isDate(value: string): boolean {
        return dayjs(value).format('YYYY-MM-DD') === value;
    }

    isEmpty(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    datengChange(date: string) {
        if (this.isDate(date)) {
            const yearStarted = dayjs(date).year();
            if (this.projectCycle > 1) {
                this.conclusionForm.middleYear = yearStarted + Math.floor((this.projectCycle + 1) / 2);
            }
            this.conclusionForm.knotYear = yearStarted + this.projectCycle;
        }
    }

    get confirmAble(): boolean {
        return this.finalOk && (!this.isDate(this.conclusionForm.dateStarted) || this.isEmpty(this.conclusionForm.code));
    }
}
