import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {format, parse} from 'date-fns';
import { CommonDialog } from 'core/common-dialogs';
import { EditMode } from 'core/constants';
import { Dialog } from 'core/dialogs';

import { ReceiptForm } from '../shared/form.model';
import { Asset } from '../../shared/asset-form.model';
import { AssetFormService } from '../form.service';
import './form-editor.model';
import { ReceiptItemDialog } from './receipt-item/receipt-item.dialog';

@Component({
    templateUrl: 'form-editor.component.html',
})
export class ReceiptFormEditorComponent {
    editMode: EditMode;
    form: ReceiptForm;
    assetTypes: string[];
    suppliers: any[];
    assetNames: any[];

    constructor(
        private service: AssetFormService,
        private route: ActivatedRoute,
        private router: Router,
        private dialogs: CommonDialog,
        private dialog: Dialog,
    ) {
        this.editMode = this.route.snapshot.data['mode'];
        const params = this.route.snapshot.params;
        this.service.loadDataForCreate().subscribe(dto => this.onLoadData(dto));
        if (this.editMode === EditMode.Edit) {
            this.service.loadItemForEdit(params['id']).subscribe(dto => this.onLoadData(dto));
        }
    }

    onLoadData(dto: any) {
        this.form = new ReceiptForm(dto.form);
        this.assetTypes = dto.assetTypes;
        this.suppliers = dto.suppliers;
        this.assetNames = dto.assetNames;
        this.form.removedItems = [];
    }

    addItem() {
        console.log(parse('2020-12-32', 'yyyy-MM-dd', 0).toString() === 'Invalid Date');
        const its = this.form.items.map(item => item.id);
        this.dialog.open(ReceiptItemDialog, {
            assetTypes: this.assetTypes,
            suppliers: this.suppliers,
            assetNames: this.assetNames,
        }).then(result => {
            const item = new Asset(result);
            // item.id = this.form.items.length + 1;
            this.form.addItem(item);
        });
    }

    remove(item: any) {
        this.dialogs.confirm('警告', `确定要删除第${item.id}条明细吗？`).then(() => {
            this.form.removeItem(item);
        });
    }

    save() {
        if (this.editMode === EditMode.Create) {
            this.create();
        } else if (this.editMode === EditMode.Edit) {
            this.update();
        }
    }

    create() {
        this.service.create(this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['../', id], { relativeTo: this.route });
        });
    }

    update() {
        this.service.update(this.form.id, this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['../'], { relativeTo: this.route });
        });
    }
}
