import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dialog } from 'core/dialogs';
import { ReviewOptions } from 'core/workflow';

import { AwardForm } from '../../shared/form.model';
import { WorkflowFinishDialog } from '../shared/finish-dialog/finish.dialog';
import { ApplicationForm } from '../shared/form.model';

import { PaperApprovalService } from './approval.service';
import { UploaderDialog } from './uploader.dialog';

@Component({
    templateUrl: 'approval-item.component.html',
})
export class PaperApprovalItemComponent {
    form: ApplicationForm;
    fileNames: any;
    settings: AwardForm;
    paperForm: any;

    uploadUrl: string;

    private wi: string;
    private prevId: number;
    private nextId: number;

    constructor(route: ActivatedRoute,
                private service: PaperApprovalService,
                private dialog: Dialog) {
        route.data.subscribe((data: {item: any}) => this.onItemLoaded(data.item));
    }

    onItemLoaded(dto: any) {
        this.form = new ApplicationForm(dto.form);
        this.settings = new AwardForm(dto.settings);
        this.fileNames = dto.fileNames;
        this.paperForm = dto.paperForm;

        this.wi = dto.workitemId;
        this.prevId = dto.prevId;
        this.nextId = dto.nextId;
    }

    get reviewable(): boolean {
        return this.form.status === 'STEP3' || this.form.status === 'STEP4';
    }

    get reviewOptions(): ReviewOptions {
        return {
            id: this.form.id,
            wi: this.wi,
            type: 'approve',
            what: this.form.title,
        };
    }

    finish() {
        this.dialog.open(WorkflowFinishDialog).then((result: string) => {
            this.service.finish(this.form.id, result).subscribe(dto => {
                this.form = new ApplicationForm(dto.form);
            }, (error) => {
                alert(error.json().message);
            });
        });
    }

    uploadReview() {
        const uploadUrl = this.service.getUploadUrl(this.form.id);
        this.dialog.open(UploaderDialog, {uploadUrl})
        .then(() => {
            this.service.loadFileNames(this.form.id, undefined).subscribe(dto => {
                this.fileNames = dto.fileNames;
            });
        });
    }
}
