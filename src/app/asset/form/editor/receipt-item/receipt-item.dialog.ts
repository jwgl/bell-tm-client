import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import format from 'date-fns/format';

import { BaseDialog } from 'core/dialogs';
import { Asset } from '../../shared/form.model';

@Component({
    templateUrl: 'receipt-item.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class ReceiptItemDialog extends BaseDialog {
    item: Asset;
    assetTypes: string[];
    model: any;
    suppliers: any[];

    constructor() {
        super();
        this.item = new Asset([]);
    }

    protected onOpening(): Observable<any> {
        if (this.options) {
            this.item = new Asset(this.options.form);
            this.suppliers = this.options.suppliers;
            this.assetTypes = this.options.assetTypes;
            this.item.dateBought = format(new Date(), 'yyyy-MM-dd');
        }
        return null;
    }

    protected onConfirmed(): any {
        return {
            id: this.item.id,
            sn: this.item.sn,
            code: this.item.code,
            price: this.item.price,
            dateBought: this.item.dateBought,
            qualifyMonth: this.item.qualifyMonth,
            supplierId: this.item.supplierId,
            assetModelId: this.model.assetModelId,
            name: this.model.name,
            brand: this.model.brand,
            specs: this.model.specs,
            parameter: this.model.parameter,
            assetType: this.item.assetType,
            unit: this.item.unit,
            pcs: this.item.pcs,
            note: this.item.note,
        };
    }

    save() {
        if (this.model) {
            this.ok();
        } else {
            alert('请选择规格型号！');
        }
    }

    onObjectSelected(object: any) {
        this.item.assetType = object.name;
    }

    onModelSelected(model: any): void {
        if (model) {
            this.model = model;
        }
    }
}
