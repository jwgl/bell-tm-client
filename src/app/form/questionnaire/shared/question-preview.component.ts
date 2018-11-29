import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Question, QuestionOption } from './questionnaire-form.model';

@Component({
    selector: 'tm-question-preview',
    styleUrls: ['question-preview.component.scss'],
    templateUrl: 'question-preview.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionPreviewComponent {
    @Input()
    question: Question;

    selectedOption: QuestionOption;
    openTextValue: string;
}
