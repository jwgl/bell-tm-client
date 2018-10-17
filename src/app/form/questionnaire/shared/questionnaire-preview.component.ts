import { Component, Input } from '@angular/core';

@Component({
    selector: 'tm-questionnaire-preview',
    styleUrls: ['questionnaire-preview.component.scss'],
    templateUrl: 'questionnaire-preview.component.html',
})
export class QuestionnairePreviewComponent {
    @Input() form: any;
}
