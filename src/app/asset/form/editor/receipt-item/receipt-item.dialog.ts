import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import * as dayjs from 'dayjs';

import { BaseDialog } from 'core/dialogs';
import { Http } from 'core/rest';
import { Asset } from '../../../shared/asset-form.model';

@Component({
    templateUrl: 'receipt-item.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class ReceiptItemDialog extends BaseDialog {
    item: Asset;
    assetTypes: string[];
    suppliers: any[];
    assetModels: any;
    assetNames: any[];

    constructor(private http: Http) {
        super();
        this.item = new Asset([]);
    }

    protected onOpening(): Observable<any> {
        if (this.options) {
            this.item = new Asset(this.options.form);
            this.suppliers = this.options.suppliers;
            this.assetTypes = this.options.assetTypes;
            this.assetNames = this.options.assetNames;
            this.item.dateBought = dayjs().format('YYYY-MM-DD');
        }
        return null;
    }

    protected onConfirmed(): any {
        let model = {name: null, brand: null, specs: null, parameter: null};
        if (this.assetModels && this.item.assetModelId) {
            model = this.assetModels.find(item => item.id === this.item.assetModelId);
        }
        return {
            id: this.item.id,
            sn: this.item.sn,
            code: this.item.code,
            price: this.item.price,
            dateBought: this.item.dateBought,
            qualifyMonth: this.item.qualifyMonth,
            supplierId: this.item.supplierId,
            assetModelId: this.item.assetModelId,
            name: model.name ? model.name : this.item.name,
            brand: model.brand,
            specs: model.specs,
            parameter: model.parameter,
            assetType: this.item.assetType,
            unit: this.item.unit,
            pcs: this.item.pcs,
            note: this.item.note,
        };
    }

    save() {
        if (!this.item.unit) {
            alert('单位不能为空！');
        } else if (!this.item.pcs) {
            alert('请输入数量！');
        } else if (dayjs(this.item.dateBought, 'YYYY-MM-DD', true).isValid()) {
            alert('购买日期不合法，请按照格式输入：yyyy-MM-dd');
        } else {
            this.ok();
        }
    }

    onObjectSelected(object: any) {
        this.item.assetType = object.name;
    }

    onNameSelected(object: any) {
        if (this.item.name !== object.name) {
            this.assetNameChange(object.name);
            this.item.name = object.name;
        }
    }

    modelLabel(model: any): string {
        return model ? `${model.name}\t${model.brand}\t${model.specs}\t${model.parameter}` : '空';
    }

    assetNameChange(name: string) {
        if (name) {
            this.http.get(`/api/asset/models?q=${encodeURIComponent(name)}`)
            .subscribe(value => this.assetModels = value);
        }
    }
}
