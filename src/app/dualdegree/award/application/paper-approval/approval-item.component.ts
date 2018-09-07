import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Dialog} from 'core/dialogs';

import {AwardForm} from '../../shared/form.model';
import {ApplicationForm} from '../shared/form.model';

import {PaperApprovalService} from './approval.service';
import {UploaderDialog} from './uploader.dialog';

@Component({
    templateUrl: 'approval-item.component.html',
})
export class PaperApprovalItemComponent {
    form: ApplicationForm;
    fileNames: any;
    settings: AwardForm;
    paperForm: any;

    xsrfToken: string;
    uploadUrl: string;

    constructor(private service: PaperApprovalService,
                private dialog: Dialog) { }

    onItemLoaded(dto: any) {
        this.form = new ApplicationForm(dto.form);
        this.settings = new AwardForm(dto.settings);
        this.fileNames = dto.fileNames;
        this.paperForm = dto.paperForm;
    }

    get reviewable(): boolean {
        return this.form.status === 'STEP3' || this.form.status === 'STEP4';
    }

    finish() {
        this.service.finish(this.form.id).subscribe(dto => {
            this.form = new ApplicationForm(dto.form);
        }, (error) => {
            alert(error.json().message);
        });
    }

    uploadReview() {
        const uploadUrl = this.service.getUploadUrl(this.form.id);
        const xsrfToken = this.service.xsrfToken;
        this.dialog.open(UploaderDialog, {uploadUrl, xsrfToken})
        .then(() => {
            this.service.loadFileNames(this.form.id, undefined).subscribe(dto => {
                this.fileNames = dto.fileNames;
            });
        });
    }
}
