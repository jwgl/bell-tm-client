import { Component, Input } from '@angular/core';

@Component({
    selector: 'tm-observation-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class ObservationFormViewerComponent {
    @Input() vm: any;
    @Input() evaluationSystem: any;
}
