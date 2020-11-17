import { Component } from '@angular/core';

import { ReceiptForm } from '../form/shared/form.model';
@Component({
    templateUrl: 'approval-item.component.html',
})
export class ApprovalItemComponent {
    form: ReceiptForm;

    onItemLoaded(dto: any) {
        this.form = new ReceiptForm(dto.form);
    }

    get title(): string {
        return `入库单#${this.form ? this.form.id : ''}`;
    }
}
