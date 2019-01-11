import { Component } from '@angular/core';

import { ChangeForm } from '../form/shared/form.model';
import { ApprovalService } from './approval.service';
@Component({
    templateUrl: 'approval-item.component.html',
})
export class InfoChangeApprovalItemComponent {
    form: ChangeForm;
    project: any;

    constructor(private service: ApprovalService) { }

    onItemLoaded(dto: any) {
        this.form = new ChangeForm(dto.form);
        this.project = dto.project;
    }

    get downloadUrl(): string {
        return this.service.getDownloadUrl(this.form.id);
    }

    get reviewAble(): boolean {
        if (this.form && this.form.status === 'CHECKED') {
            return this.form.dateReviewed ? true : this.form.reviewer ? false : true;
        } else {
            return false;
        }
    }
}
