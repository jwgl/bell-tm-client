import { Component } from '@angular/core';

import { TransferForm } from '../../area/shared/form.model';
@Component({
    templateUrl: 'approval-item.component.html',
})
export class ApprovalItemComponent {
    form: TransferForm;

    onItemLoaded(dto: any) {
        this.form = new TransferForm(dto.form);
        this.form.title = '领用单';
    }

    get title(): string {
        return `领用单#${this.form ? this.form.id : ''}`;
    }
}
