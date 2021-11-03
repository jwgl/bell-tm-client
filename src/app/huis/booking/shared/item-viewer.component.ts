import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemStatusConverter } from '../../shared/common.model';
import { BookingItem } from './booking-form.model';

@Component({
    selector: 'tm-booking-item-viewer',
    styleUrls: ['item-viewer.component.scss'],
    templateUrl: 'item-viewer.component.html',
})
export class BookingItemViewerComponent {
    @Input() item: BookingItem;
    @Input() removable: boolean = false;
    @Input() revokable: boolean = false;
    @Output("onRemove") onRemove = new EventEmitter<void>();
    @Output("onRevoke") onRevoke = new EventEmitter<void>();

    itemStatusConverter = new ItemStatusConverter();

    remove() {
        this.onRemove.emit();
    }

    revoke() {
        this.onRevoke.emit();
    }
}
