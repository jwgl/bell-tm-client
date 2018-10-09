import { Component, Input, Output, EventEmitter } from '@angular/core';

import { QuestionOption, Question } from '../../shared/questionnaire-form.model';

@Component({
    selector: 'tm-question-option-editor',
    styleUrls: ['question-option-editor.component.scss'],
    templateUrl: 'question-option-editor.component.html',
})
export class QuestionOptionEditorComponent {
    @Input()
    question: Question;

    @Input()
    option: QuestionOption;

    @Input()
    type: number;

    @Input()
    showValue: boolean;

    @Input()
    showLabel: boolean;

    @Output()
    moveup = new EventEmitter();

    @Output()
    movedown = new EventEmitter();

    @Output()
    remove = new EventEmitter();

    onMoveup() {
        this.moveup.emit();
    }

    onMovedown() {
        this.movedown.emit();
    }

    onRemove() {
        this.remove.emit();
    }

    get first(): boolean {
        return this.option.ordinal === 0;
    }

    get last(): boolean {
        return this.option.ordinal === this.question.options.length - 1;
    }
}
