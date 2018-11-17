import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'tm-booking-viewer',
    styleUrls: ['booking-viewer.component.scss'],
    templateUrl: 'booking-viewer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingViewerComponent {
    @Input()
    booking: any;
}
