import { Component, Input } from '@angular/core';

@Component({
    selector: 'project-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class FormViewerComponent {
    @Input() vm: any;
}
