import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Question, QuestionOption } from './questionnaire-form.model';

declare module './questionnaire-form.model' {
    interface QuestionOption {
        selected: boolean;
    }
}

@Component({
    selector: 'tm-ballot-question-preview',
    styleUrls: ['ballot-question-preview.component.scss'],
    templateUrl: 'ballot-question-preview.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BallotQuestionPreviewComponent {
    @Input()
    question: Question;

    choice: QuestionOption;
}
