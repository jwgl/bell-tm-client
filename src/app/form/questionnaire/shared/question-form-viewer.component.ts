import { Component, Input } from '@angular/core';

import { Question, QuestionOption } from './questionnaire-form.model';

@Component({
    selector: 'tm-question-form-viewer',
    styleUrls: ['question-form-viewer.component.scss'],
    templateUrl: 'question-form-viewer.component.html',
})
export class QuestionFormViewerComponent {
    @Input()
    question: Question;

    selectedOption: QuestionOption;
    openTextValue: string;
}
