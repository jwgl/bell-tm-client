import { Component, Input } from '@angular/core';

@Component({
    selector: 'tm-transfer-form-viewer',
    templateUrl: 'form-viewer.component.html',
})
export class TransferFormViewerComponent {
    @Input() vm: any;
}
