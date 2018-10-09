import { Component, Input } from '@angular/core';

@Component({
    selector: 'tm-questionnaire-form-viewer',
    styleUrls: ['questionnaire-form-viewer.component.scss'],
    templateUrl: 'questionnaire-form-viewer.component.html',
})
export class QuestionnaireFormViewerComponent {
    @Input() form: any;
}
