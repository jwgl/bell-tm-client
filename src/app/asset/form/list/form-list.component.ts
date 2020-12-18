import { Component } from '@angular/core';

import { Asset, ReceiptForm } from '../shared/form.model';

import { AssetFormService } from '../form.service';

@Component({
    templateUrl: 'form-list.component.html',
})
export class ReceiptFormListComponent {
    receiptForms: ReceiptForm[];

    constructor(private service: AssetFormService) {
        this.loadData();
    }

    loadData() {
        this.service.loadList().subscribe((dto: any) => {
            this.receiptForms = dto.map(it => new ReceiptForm(it));
        });
    }
}
