import { Component, Input } from '@angular/core';

@Component({
    selector: 'tm-operation-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class OperationFormViewerComponent {
    @Input() form: any;
}
