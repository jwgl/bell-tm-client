import { Component, Input, Output, EventEmitter } from '@angular/core';

import { QuestionOption, Question } from '../../shared/questionnaire-form.model';

@Component({
    selector: 'tm-ballot-option-editor',
    styleUrls: ['ballot-option-editor.component.scss'],
    templateUrl: 'ballot-option-editor.component.html',
})
export class BallotOptionEditorComponent {
    @Input()
    question: Question;

    @Input()
    option: QuestionOption;

    @Input()
    mode: 'edit' | 'create';

    @Output()
    confirm = new EventEmitter<QuestionOption>();

    @Output()
    cancel = new EventEmitter<QuestionOption>();

    onSubmit() {
        this.confirm.emit(this.option);
    }

    onCancel() {
        this.cancel.emit(this.option);
    }
}
