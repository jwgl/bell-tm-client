import { Component, Input, OnInit } from '@angular/core';

import { NumberStringOption } from 'core/options';

import { Question, QuestionOption } from '../../shared/questionnaire-form.model';
import { QuestionType, QUESTION_TYPES } from '../../shared/question-type.model';

const ALLOWED_QUESTION_TYPE = [QuestionType.SINGLE, QuestionType.MUTIPLE];
@Component({
    selector: 'tm-ballot-question-editor',
    styleUrls: ['ballot-question-editor.component.scss'],
    templateUrl: 'ballot-question-editor.component.html',
})
export class BallotQuestionEditorComponent implements OnInit {
    @Input()
    question: Question;

    questionTypes: NumberStringOption[];
    selectedOption: QuestionOption;

    ngOnInit() {
        this.questionTypes = QUESTION_TYPES.filter(it => ALLOWED_QUESTION_TYPE.includes(it.value));
    }

    updateTypeOption() {
        this.question.minValue = this.question.typeOptions.min.default;
        this.question.maxValue = this.question.typeOptions.max.default;
        this.onQuestionChanged();
    }

    onQuestionChanged() {
        this.question.__updated = true;
    }

    onTypeChanged(): void {
        this.updateTypeOption();
    }

    onCreateOption() {
        this.selectedOption = QuestionOption.newInstance(this.question);
        this.scrollToView();
    }

    onOptionCreated(option: QuestionOption) {
        this.question.addItem(option);
        this.selectedOption = null;
    }

    onEditOption(option: QuestionOption) {
        this.selectedOption = option.clone();
        this.scrollToView();
    }

    onOptionUpdated(option: QuestionOption) {
        this.question.updateItem(option);
        this.selectedOption = null;
    }

    onOptionCanceled(option: QuestionOption) {
        this.selectedOption = null;
    }

    private scrollToView(): void {
        setTimeout(() => {
            document.getElementById('ballot-option-editor').scrollIntoView();
        }, 1);
    }
}
