import { Component } from '@angular/core';

import * as _ from 'lodash';
import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

import { FileTypes, ContentLabels } from '../../shared/constants';
import { ProjectForm } from '../shared/form.model';

@Component({
    templateUrl: 'inspect.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class InspectDialog extends BaseDialog {
    form: ProjectForm;
    uploadUrl: string;

    get contentLabel(): string {
        return this.form.reportType ? ContentLabels.content[this.form.reportType] : '';
    }

    get furtherLabel(): string {
        return this.form.reportType ? ContentLabels.further[this.form.reportType] : '';
    }

    get otherLabel(): string {
        return this.form.reportType ? ContentLabels.other[this.form.reportType] : '';
    }

    isEmpty(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    validate(form: any): string[] {
        const validation: string[] = [];
        if (this.isEmpty(form.phone)) {
            validation.push('请输入电话号码！');
        }
        if (this.isEmpty(form.content)) {
            validation.push(`请输入${this.contentLabel}！`);
        }
        if (form.content && form.content.length > 1500) {
            validation.push(`${this.contentLabel}不要超过1500字！`);
        }
        if (form.achievements && form.achievements.length > 1500) {
            validation.push(`${this.furtherLabel}不要超过1500字！`);
        }
        if (form.other && form.other.length > 1500) {
            validation.push(`${this.otherLabel}不要超过1500字！`);
        }
        return validation;
    }

    uploadOptions(fileType: any): any {
        const max = fileType.prefix === 'proof' ? 3 : 1;
        return { concurrency: 3, maxUploads: max - fileType.names.length };
    }

    protected onOpening(): Observable<any> {
        this.form = new ProjectForm(this.options.form);
        this.uploadUrl = this.options.uploadUrl;
        const fileTypes = FileTypes.find(f => f.reviewType === this.form.reportType).fileType;
        this.form.tranFile(fileTypes);
        return null;
    }

    protected onConfirmed(): any {
        return { form: this.form, validation: this.validate(this.form) };
    }
}
