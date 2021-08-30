import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseDialog } from 'core/dialogs';

import { Business, Color } from '../shared/label.model';
@Component({
    templateUrl: 'labelling.component.html',
})
export class LabellingComponent extends BaseDialog {
    labels: any;
    business = Business;
    colors = Color;
    form: any;

    constructor() {
        super();
        this.form = {};
    }

    protected onOpening(): Observable<any> {
        this.labels = this.options.labels;
        this.form.business = '排课';
        return null;
    }

    protected onConfirmed(): any {
        return this.form;
    }

    filterByBusiness(business: string) {
        return (label: any) => label.business === business;
    }

    filterByType(type: string) {
        return (label: any) => label.type === type;
    }

    onSubmit() {
        if (!this.form.id || !this.form.dateExpire) {
            alert('标签或失效日期不能空！');
        } else {
            this.ok();
        }
    }
}
