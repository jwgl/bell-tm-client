import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Dialog} from 'core/dialogs';

import {AwardForm} from '../../shared/form.model';
import {ApplicationForm} from '../shared/form.model';
import {MentorSelectDialog} from './mentor/mentor-select.dialog';
import {ApprovalService} from './approval.service';

@Component({
    templateUrl: 'approval-item.component.html',
})
export class ApplicationApprovalItemComponent {
    form: ApplicationForm;
    fileNames: any;
    settings: AwardForm;

    constructor(route: ActivatedRoute,
        private dialog: Dialog,
        private service: ApprovalService) {
route.data.subscribe((data: {item: any}) => this.onItemLoaded(data.item));
}

    onItemLoaded(dto: any) {
        this.form = new ApplicationForm(dto.form);
        this.settings = new AwardForm(dto.settings);
        this.fileNames = dto.fileNames;

    }

    get mentorable(): boolean {
        return !this.form.paperApprover && this.form.status === 'STEP3';
    }

    setMentor() {
        this.dialog.open(MentorSelectDialog).then(result => {
            this.service.setMentor(this.form.id, {teacherId: result})
                .subscribe(() => this.form.paperApprover = result);
        });
    }
}
