import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Question } from './questionnaire-form.model';

@Component({
    selector: 'tm-question-form-viewer',
    styleUrls: ['question-form-viewer.component.scss'],
    templateUrl: 'question-form-viewer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionViewerComponent {
    @Input()
    question: Question;
}
