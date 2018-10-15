import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../shared/questionnaire-form.model';

@Component({
    selector: 'tm-question-viewer',
    styleUrls: ['question-viewer.component.scss'],
    templateUrl: 'question-viewer.component.html',
})
export class QuestionViewerComponent {
    @Input()
    question: Question;

    @Input()
    first: boolean;

    @Input()
    last: boolean;

    @Output()
    edit = new EventEmitter();

    @Output()
    remove = new EventEmitter();

    onEdit() {
        this.edit.emit(this.question);
    }

    onRemove() {
        this.remove.emit(this.question);
    }
}
