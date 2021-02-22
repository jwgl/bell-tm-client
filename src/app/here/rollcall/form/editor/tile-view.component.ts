import { Component } from '@angular/core';

import { Student } from '../rollcall-form.model';
import { RollcallFormService } from '../rollcall-form.service';
import { BaseRollcallView } from './base-view.component';

@Component({
    styleUrls: ['tile-view.component.scss'],
    templateUrl: 'tile-view.component.html',
})
export class RollcallTileViewComponent extends BaseRollcallView {
    hovered: Student = null;

    constructor(service: RollcallFormService) {
        super(service.editor);
    }
}
