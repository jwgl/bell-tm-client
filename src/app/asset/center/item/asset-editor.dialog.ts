import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import { BaseDialog } from 'core/dialogs';
import { Http } from 'core/rest';
import { Asset } from '../../shared/asset-form.model';

@Component({
    templateUrl: 'asset-editor.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class AssetEditorDialog extends BaseDialog {
    item: any;
    assetTypes: string[];
    suppliers: any[];
    assetModels: any;
    sake: string;

    constructor(private http: Http) {
        super();
    }

    protected onOpening(): Observable<any> {
        this.item = this.options.form;
        this.suppliers = this.options.suppliers;
        this.loadModels(this.item.name);
        return null;
    }

    protected onConfirmed(): any {
        return this.item;
    }

    loadModels(name: string) {
        if (name) {
            this.http.get(`/api/asset/models?q=${encodeURIComponent(name)}`)
            .subscribe(value => this.assetModels = value);
        }
    }

    modelLabel(model: any): string {
        return model ? `${model.name}\t${model.brand}\t${model.specs}\t${model.parameter}` : '空';
    }

    save() {
        if (!dayjs(this.item.dateBought, 'YYYY-MM-DD', true).isValid()) {
            alert('购买日期不合法，请按照格式输入：yyyy-MM-dd');
        } else {
            this.ok();
        }
    }

}
