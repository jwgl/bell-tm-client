import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { Editable } from 'core/form';
import { WorkflowForm } from 'core/workflow/form-item.model';
import { Dialog } from 'core/dialogs';
import { CommonDialog } from 'core/common-dialogs';
import { WorkflowSubmitDialog } from 'core/workflow/submit.dialog';

import { ReceiptForm } from '../shared/form.model';
import { AssetFormService } from '../form.service';

@Component({
    templateUrl: 'item.component.html',
})
export class ReceiptItemComponent {
    vm: ReceiptForm;
    saving = false;
    convert(dto: any): WorkflowForm {
        return new(Editable(ReceiptForm))(dto.form);
    }

    // constructor(
    //     private route: ActivatedRoute,
    //     private dialogs: CommonDialog,
    //     private service: AssetFormService,
    //     private dialog: Dialog,
    // ) {
    //     const params = this.route.snapshot.params;
    //     this.loadData(params['id']);
    // }

    // loadData(id: number) {
    //     this.service.loadItem(id).subscribe(dto => {
    //         this.vm = new ReceiptForm(dto);
    //     });
    // }

    // submit(): void {
    //     this.saving = true;
    //     this.dialog.open(WorkflowSubmitDialog, {
    //         whoUrl: `${this.service.api.item(this.vm.id)}/checkers`,
    //         does: '确认',
    //         what: `入库单#${this.vm.id}`,
    //     }).then(result => {
    //         this.service.submit(this.vm.id, {
    //             title: result.what,
    //             to: result.to,
    //             comment: result.comment,
    //         }).subscribe(() => {
    //             this.loadData(this.vm.id);
    //         });
    //     });
    // }
}
