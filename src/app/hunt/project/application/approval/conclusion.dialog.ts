import { Component } from '@angular/core';

import * as _ from 'lodash';
import * as dayjs from 'dayjs';
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

    protected onOpening(): Observable<any> {
        this.level = this.options.level;
        this.conclusions = this.options.conclusions;
        this.conclusionForm = new ConclusionForm(this.options.conclusionForm);
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

    validate(): string[] {
        const validation: string[] = [];
        if (this.isEmpty(this.conclusionForm.conclusionOfUniversity) ||
            this.isEmpty(this.conclusionForm.opinionOfUniversity)) {
            validation.push('请检查结论和意见是否为空！');
        }
        if (this.finalOk && (
            this.isEmpty(this.conclusionForm.dateStarted)
        )) {
            validation.push('立项日期输入不正确！');
        }
        return validation;
    }
}
