import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseDialog } from 'core/dialogs';

import { Business, LabelForm, Color} from '../shared/label.model';
@Component({
    styleUrls: ['label.component.scss'],
    templateUrl: 'label.component.html',
})
export class LabelComponent extends BaseDialog {
    labelTypes: any;
    form: LabelForm;
    business = Business;
    colors = Color;
    newType = false;

    constructor() {
        super();
        this.form = new LabelForm();
    }

    protected onOpening(): Observable<any> {
        this.labelTypes = this.options.labelTypes;
        return null;
    }

    protected onConfirmed(): any {
        this.form.color = this.colorName(this.form.color);
        return this.form;
    }

    showNewType() {
        this.newType = true;
        this.form.typeId = null;
    }

    colorSelect(color: string) {
        this.form.color = color;
    }

    colorName(color: string): string {
        return this.form.single ? color + '-300' : color;
    }

    get valid(): boolean {
        if (this.form.name && this.form.business &&
            (this.form.typeId || (this.form.typeName && this.form.color))) {
            return true;
        }
        return false;
    }
}
