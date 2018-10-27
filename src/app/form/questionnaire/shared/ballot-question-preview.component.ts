import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Question } from './questionnaire-form.model';

@Component({
    selector: 'tm-ballot-question-preview',
    styleUrls: ['ballot-question-preview.component.scss'],
    templateUrl: 'ballot-question-preview.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BallotQuestionPreviewComponent {
    @Input()
    question: Question;
}
