import { Component } from '@angular/core';

import * as _ from 'lodash';
import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

import { paperTypeLabels } from '../../shared/constant';
import { PaperForm } from './paper.model';

@Component({
    templateUrl: 'paper-form.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class PaperFormDialog extends BaseDialog {
    form: PaperForm;
    uploadUrl: string;
    fileType: any;
    types = paperTypeLabels;

    constructor() {
        super();
    }

    isEmpty(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    get disabled(): boolean {
        return this.isEmpty(this.form.chineseTitle) || this.isEmpty(this.form.englishTitle);
    }

    protected onOpening(): Observable<any> {
        this.uploadUrl = this.options.uploadUrl;
        this.fileType = this.options.fileType;
        this.form = new PaperForm(this.options.paper);
        if (!this.form.type) {
            this.form.type = 3;
        }
        return null;
    }

    protected onConfirmed(): any {
        return this.form.toServerDto();
    }
}
