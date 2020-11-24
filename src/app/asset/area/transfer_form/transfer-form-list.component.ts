import { Component } from '@angular/core';

import { TransferFormService } from '../transfer.service';

@Component({
    templateUrl: 'transfer-form-list.component.html',
})
export class TransferFormListComponent {
    forms: any;

    constructor(service: TransferFormService) {
        service.loadList().subscribe((dto: any) => this.forms = dto);
    }
}
