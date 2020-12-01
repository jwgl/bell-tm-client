import { Component } from '@angular/core';

import { TransferForm } from '../../area/shared/form.model';
@Component({
    templateUrl: 'approval-item.component.html',
})
export class ApprovalItemComponent {
    form: TransferForm;

    onItemLoaded(dto: any) {
        this.form = new TransferForm(dto.form);
        this.form.title = `${this.form.type}单`;
    }

    get title(): string {
        if (this.form) {
            return `${this.form.type}单#${this.form.id}`;
        }
        return '';
    }
}
