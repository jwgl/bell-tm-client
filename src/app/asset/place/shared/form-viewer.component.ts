import { Component, Input } from '@angular/core';

@Component({
    selector: 'tm-place-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class PlaceFormViewerComponent {
    @Input() vm: any;
}
