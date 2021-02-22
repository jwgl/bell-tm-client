import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StatementItem } from './statement-form.model';

@Component({
    selector: 'tm-statement-item-viewer',
    styleUrls: ['item-viewer.component.scss'],
    templateUrl: 'item-viewer.component.html',
})
export class StatementItemViewerComponent {
    @Input() item: StatementItem;
    @Input() removable: boolean = false;
    @Output("onRemove") onRemove: EventEmitter<void> = new EventEmitter<void>();
    remove() {
        this.onRemove.emit();
    }
}
