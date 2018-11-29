import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Question, QuestionOption } from './questionnaire-form.model';

@Component({
    selector: 'tm-question-form-viewer',
    styleUrls: ['question-form-viewer.component.scss'],
    templateUrl: 'question-form-viewer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionFormViewerComponent {
    @Input()
    question: Question;

    selectedOption: QuestionOption;
    openTextValue: string;
}
