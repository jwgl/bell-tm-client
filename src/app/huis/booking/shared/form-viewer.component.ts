import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookingItem } from './booking-form.model';

@Component({
    selector: 'tm-booking-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class BookingFormViewerComponent {
    @Input() form: any;
    @Input() revokable: boolean = false;
    @Output("onRevokeItem") onRevokeItem: EventEmitter<BookingItem> = new EventEmitter<BookingItem>();

    revokeItem(item: BookingItem) {
        this.onRevokeItem.emit(item);
    }

    itemRevokable(item: BookingItem): boolean {
        return this.revokable && (item.status == "ACTIVE" || item.status == "REVOKED");
    }
}
