import { Component, Input } from '@angular/core';

@Component({
    selector: 'tm-service-log-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class ServiceLogFormViewerComponent {
    @Input() vm: any;
    @Input() assets: any;
}
