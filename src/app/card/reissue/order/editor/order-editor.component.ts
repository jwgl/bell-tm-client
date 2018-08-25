import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EditMode } from 'core/constants';
import { Dialog } from 'core/dialogs';

import { ReissueFormSelectDialog } from './form-select.dialog';
import { ReissueOrderService } from '../reissue-order.service';
import { ReissueOrder } from '../reissue-order.model';

@Component({
    templateUrl: 'order-editor.component.html',
})
export class ReissueOrderEditorComponent {
    editMode: EditMode;
    vm: ReissueOrder;
    saving = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: Dialog,
        private service: ReissueOrderService,
    ) {
        this.route.params.subscribe(params => {
            this.editMode = this.route.snapshot.data['mode'];
            switch (this.editMode) {
                case EditMode.Create:
                    this.vm = ReissueOrder.create();
                    break;
                case EditMode.Edit:
                    this.service.loadItemForEdit(params['id']).subscribe(dto => this.vm = ReissueOrder.fromDto(dto));
                    break;
            }
        });
    }

    save() {
        switch (this.editMode) {
            case EditMode.Create:
                this.create();
                break;
            case EditMode.Edit:
                this.update();
                break;
        }
    }

    create() {
        this.saving = true;
        this.service.create(this.vm.toServerDto()).subscribe(id => {
            this.router.navigate(['../', id], { relativeTo: this.route });
        }, error => {
            this.saving = false;
            alert(error.json().message);
        });
    }

    update() {
        this.saving = true;
        this.service.update(this.vm.id, this.vm.toServerDto()).subscribe(id => {
            this.router.navigate(['../'], { relativeTo: this.route });
        }, error => {
            this.saving = false;
            alert(error.json().message);
        });
    }

    addItems() {
        this.dialog.open(ReissueFormSelectDialog, { order: this.vm }).then((results: any[]) => {
            results.forEach(item => this.vm.addItem(item));
        });
    }

    removeItem(formId: number) {
        this.vm.removeItem(formId);
    }
}
