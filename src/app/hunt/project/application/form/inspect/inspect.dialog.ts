import { Component } from '@angular/core';

import * as _ from 'lodash';
import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

import { FileTypes, ContentLabels } from '../../shared/constants';

@Component({
    templateUrl: 'inspect.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class InspectDialog extends BaseDialog {
    fileTypes: any;
    form: any;
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

    fileName(fileType: any): string {
        switch (fileType.prefix) {
            case 'main':
                return this.form.mainInfoForm;
            case 'proof':
                return this.form.proofFile;
            case 'summary':
                return this.form.summaryReport;
            default:
                return null;
        }
    }

    hasUploaded(fileType: any): boolean {
        switch (fileType.prefix) {
            case 'main':
                return !_.isEmpty(this.form.mainInfoForm);
            case 'proof':
                return !_.isEmpty(this.form.proofFile);
            case 'summary':
                return !_.isEmpty(this.form.summaryReport);
            default:
                return true;
        }
    }

    onUploaded(fileNames: any) {
        switch (fileNames.prefix) {
            case 'main':
                this.form.mainInfoForm = fileNames.name;
                break;
            case 'proof':
                this.form.proofFile = fileNames.name;
                break;
            case 'summary':
                this.form.summaryReport = fileNames.name;
                break;
        }
    }

    remove(fileType: any) {
        switch (fileType.prefix) {
            case 'main':
                this.form.mainInfoForm = null;
                break;
            case 'proof':
                this.form.proofFile = null;
                break;
            case 'summary':
                this.form.summaryReport = null;
        }
    }

    protected onOpening(): Observable<any> {
        this.form = this.options.form;
        this.uploadUrl = this.options.uploadUrl;
        this.fileTypes = FileTypes.find(f => f.reviewType === this.form.reportType).fileType;
        return null;
    }

    protected onConfirmed(): any {
        return { form: this.form, validation: this.validate(this.form) };
    }
}
