import { Component } from '@angular/core';

import { TransferForm } from '../shared/form.model';
import { TransferFormService } from '../transfer.service';

@Component({
    templateUrl: 'transfer-form-list.component.html',
})
export class TransferFormListComponent {
    forms: TransferForm;

    constructor(service: TransferFormService) {
        service.loadList().subscribe((dto: any) => {
            this.forms = dto.map(it => new TransferForm(it));
        });
    }
}
