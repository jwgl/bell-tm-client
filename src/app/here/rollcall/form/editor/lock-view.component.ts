import { Component } from '@angular/core';
import { RollcallFormService } from '../rollcall-form.service';

import { BaseRollcallView } from './base-view.component';

@Component({
    styleUrls: ['lock-view.component.scss'],
    templateUrl: 'lock-view.component.html',
})
export class RollcallLockViewComponent extends BaseRollcallView {
    constructor(service: RollcallFormService) {
        super(service.editor);
    }
}
