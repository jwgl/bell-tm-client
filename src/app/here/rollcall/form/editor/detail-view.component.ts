import { Component } from '@angular/core';
import { RollcallFormService } from '../rollcall-form.service';

import { BaseRollcallView } from './base-view.component';

@Component({
    styleUrls: ['detail-view.component.scss'],
    templateUrl: 'detail-view.component.html',
})
export class RollcallDetailViewComponent extends BaseRollcallView {
    constructor(service: RollcallFormService) {
        super(service.editor);
    }
}
