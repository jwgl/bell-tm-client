import { Component, Input } from '@angular/core';

import { ReissueForm } from './reissue-form.model';

@Component({
    selector: 'tm-reissue-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class ReissueFormViewerComponent {
    @Input() form: ReissueForm;
}
