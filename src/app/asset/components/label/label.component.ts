import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseDialog } from 'core/dialogs';

const Business = ['排课', '排考', '场地日常管理', '其他'];
@Component({
    templateUrl: 'label.component.html',
})
export class LabelComponent extends BaseDialog {
    roomId: number;
    labelTypes: any;
    form = {};
    constructor() {
        super();
    }

    protected onOpening(): Observable<any> {
        this.roomId = this.options.roomId;
        this.labelTypes = this.options.labelTypes;
        return null;
    }

    protected onConfirmed(): any {
    }
}
