import { Component, Input } from '@angular/core';

@Component({
    selector: 'tm-receipt-form-viewer',
    templateUrl: 'form-viewer.component.html',
})
export class ReceiptFormViewerComponent {
    @Input() vm: any;
}
