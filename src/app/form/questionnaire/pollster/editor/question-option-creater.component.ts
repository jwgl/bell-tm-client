import { Component, Input, Output, EventEmitter } from '@angular/core';

import { QuestionOption, Question } from '../../shared/questionnaire-form.model';

@Component({
    selector: 'tm-question-option-creater',
    styleUrls: ['question-option-creater.component.scss'],
    templateUrl: 'question-option-creater.component.html',
})
export class QuestionOptionCreatorComponent {
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
    create = new EventEmitter<QuestionOption>();

    @Output()
    labelChange = new EventEmitter();

    @Output()
    valueChange = new EventEmitter();

    content: string;
    label: string;
    value: number;

    constructor() {
        this.resetFields();
    }

    onCreate() {
        this.create.emit(new QuestionOption({
            ordinal: this.question.options.length,
            content: this.content,
            label: this.label,
            value: this.value,
        }));
        this.resetFields();
    }

    onToggleLabel() {
        this.labelChange.emit();
    }

    onToggleValue() {
        this.valueChange.emit();
    }

    private resetFields() {
        this.content = null;
        this.label = null;
        this.value = null;
    }
}
