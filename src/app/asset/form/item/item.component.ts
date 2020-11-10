import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { ReceiptForm } from '../shared/form.model';
import { AssetFormService } from '../form.service';

@Component({
    templateUrl: 'item.component.html',
})
export class ReceiptItemComponent {
    vm: ReceiptForm;

    constructor(
        private route: ActivatedRoute,
        private service: AssetFormService,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadItem(params['id']).subscribe(dto => {
            this.vm = new ReceiptForm(dto);
        });
    }
}
