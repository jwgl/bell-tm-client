import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Question } from './questionnaire-form.model';

@Component({
    selector: 'tm-ballot-question-form-viewer',
    styleUrls: ['ballot-question-form-viewer.component.scss'],
    templateUrl: 'ballot-question-form-viewer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BallotQuestionFormViewerComponent {
    @Input()
    question: Question;
}
