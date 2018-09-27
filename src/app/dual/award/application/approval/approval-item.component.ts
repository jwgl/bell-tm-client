import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dialog } from 'core/dialogs';
import { NextOptions } from 'core/workflow/workflow.service';

import { AwardForm } from '../../shared/form.model';
import { ApplicationForm } from '../shared/form.model';
import { MentorSelectDialog } from '../shared/mentor/mentor-select.dialog';
import { ApprovalService } from './approval.service';

@Component({
    templateUrl: 'approval-item.component.html',
})
export class ApplicationApprovalItemComponent {
    form: ApplicationForm;
    fileNames: any;
    settings: AwardForm;

    private wi: string;
    private prevId: number;
    private nextId: number;

    constructor(route: ActivatedRoute,
        private dialog: Dialog,
        private service: ApprovalService) {
        route.data.subscribe((data: { item: any }) => this.onItemLoaded(data.item));
    }

    onItemLoaded(dto: any) {
        this.form = new ApplicationForm(dto.form);
        this.settings = new AwardForm(dto.settings);
        this.fileNames = dto.fileNames;

        this.wi = dto.workitemId;
        this.prevId = dto.prevId;
        this.nextId = dto.nextId;

    }

    get reviewable(): boolean {
        return this.wi && this.form.status === 'STEP1';
    }

    get nextOptions(): NextOptions {
        return {
            id: this.form.id,
            wi: this.wi,
            type: 'next',
            what: this.form.title,
        };
    }

    get mentorable(): boolean {
        return !this.form.paperApprover && this.form.status === 'STEP3';
    }

    setMentor() {
        this.service.getMentors().subscribe(mentors =>
            this.dialog.open(MentorSelectDialog, { mentors }).then(result => {
                this.service.setMentor(this.form.id, { teacherId: result })
                    .subscribe(() => this.form.paperApprover = result);
            })
        );
    }
}
