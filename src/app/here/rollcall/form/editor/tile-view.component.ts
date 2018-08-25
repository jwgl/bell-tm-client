import { Component, Host } from '@angular/core';

import { Student } from '../rollcall-form.model';
import { BaseRollcallView } from './base-view.component';
import { RollcallFormEditorComponent } from './rollcall-editor.component';

@Component({
    styleUrls: ['tile-view.component.scss'],
    templateUrl: 'tile-view.component.html',
})
export class RollcallTileViewComponent extends BaseRollcallView {
    hovered: Student = null;

    constructor(@Host() editor: RollcallFormEditorComponent) {
        super(editor);
    }
}
