import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookingItem } from './booking-form.model';

@Component({
    selector: 'tm-booking-item-viewer',
    styleUrls: ['item-viewer.component.scss'],
    templateUrl: 'item-viewer.component.html',
})
export class BookingItemViewerComponent {
    @Input() item: BookingItem;
    @Input() removable: boolean = false;
    @Output("onRemove") onRemove: EventEmitter<void> = new EventEmitter<void>();
    remove() {
        this.onRemove.emit();
    }
}
