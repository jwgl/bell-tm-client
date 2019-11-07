import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { Dialog } from 'core/dialogs';
import { NextOptions, SubmitOptions } from 'core/workflow';

import { AwardForm } from '../../../shared/form.model';
import { ApplicationForm, FileTypes } from '../../shared/form.model';
import { ApplicationFormService } from '../form.service';
import { PaperFormDialog } from '../paper/paper-form.dialog';

@Component({
    templateUrl: 'item.component.html',
})
export class ApplicationItemComponent {
    vm: ApplicationForm;
    fileNames: any;
    award: AwardForm;
    pending: boolean;
    paperForm: any;
    latestAnswer: string;
    // 绿色通道
    privilege: boolean;

    constructor(
        private route: ActivatedRoute,
        private service: ApplicationFormService,
        private dialog: Dialog,
    ) {
        const params = this.route.snapshot.params;
        this.loadData(params['id']);
    }

    loadData(id: number) {
        this.service.loadItem<{
            form: any,
            fileNames: any,
            award: any,
            paperForm: any,
            latestAnswer: any,
            privilege: boolean,
        }>(id).subscribe(dto => {
            this.vm = new ApplicationForm(dto.form);
            this.fileNames = dto.fileNames;
            this.award = new AwardForm(dto.award);
            this.paperForm = dto.paperForm;
            this.latestAnswer = dto.latestAnswer;
            this.privilege = dto.privilege;
        });
    }

    get submitOptions(): SubmitOptions {
        return {
            id: this.vm.id,
            type: 'check',
            what: this.vm.title,
        };
    }

    get editAble(): boolean {
        return ((this.vm.status === 'CREATED' || this.vm.status === 'REJECTED') && this.award.isApplyDateValid) ||
            (this.privilege && this.award.applicationOn);
    }

    get paperAble(): boolean {
        return (this.vm.status === 'STEP2' && !_.isNull(this.award.paperEnd) && this.award.isPaperDateValid)
            || (this.vm.status === 'STEP5' && this.award.isCheckDateValid)
            || (this.privilege && this.award.paperOn);
    }

    get nextAble(): boolean {
        return this.paperForm || this.pending;
    }

    get uploadUrl(): string {
        return this.service.getUploadUrl({ awardId: this.vm.awardId });
    }

    uploadPaper() {
        const uploadUrl = this.uploadUrl;
        const fileType = FileTypes.filter(file => file.prefix === 'paper')[0];
        this.service.loadPaperForm(this.vm.id).subscribe(data => {
            const paper = data.form ? data.form : [];
            this.dialog.open(PaperFormDialog, { paper, uploadUrl, fileType })
                .then(result => {
                    this.service.createPaperForm(this.vm.id, result).subscribe(() => {
                        this.loadData(this.vm.id);
                        this.pending = true;
                    });
                });
        });
    }

    onItemLoaded(dto: any) {
        this.vm = new ApplicationForm(dto);
    }

    get nextOptions(): NextOptions {
        return {
            id: this.vm.id,
            type: 'next',
            what: this.vm.title,
        };
    }
}
