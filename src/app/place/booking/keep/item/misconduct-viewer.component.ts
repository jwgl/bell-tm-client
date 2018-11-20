import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Misconduct } from './keep-item.model';

@Component({
    selector: 'tm-misconduct-viewer',
    styleUrls: ['misconduct-viewer.component.scss'],
    templateUrl: 'misconduct-viewer.component.html',
})
export class MisconductViewerComponent {
    @Input()
    misconduct: Misconduct;

    @Input()
    pictureUrl: string;

    @Output()
    edit = new EventEmitter();

    @Output()
    remove = new EventEmitter();

    onEdit() {
        this.edit.emit();
    }

    onRemove() {
        this.remove.emit();
    }
}
