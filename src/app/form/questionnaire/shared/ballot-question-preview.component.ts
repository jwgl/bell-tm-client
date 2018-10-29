import { Component, Input } from '@angular/core';
import { Question, QuestionOption } from './questionnaire-form.model';
import { QuestionType } from './question-type.model';

declare module './questionnaire-form.model' {
    interface QuestionOption {
        selected: boolean;
    }
}

@Component({
    selector: 'tm-ballot-question-preview',
    styleUrls: ['ballot-question-preview.component.scss'],
    templateUrl: 'ballot-question-preview.component.html',
})
export class BallotQuestionPreviewComponent {
    @Input()
    question: Question;

    toggleOption(option: QuestionOption): void {
        switch (this.question.type) {
            case QuestionType.SINGLE:
                const selectedOption = this.question.options.find(it => it.selected);
                if (selectedOption) {
                    selectedOption.selected = false;
                }
                if (selectedOption !== option) {
                    option.selected = true;
                }
                break;
            case QuestionType.MUTIPLE:
                const selectedOptions = this.question.options.filter(it => it.selected);
                if (selectedOptions.includes(option)) {
                    option.selected = false;
                } else {
                    if (selectedOptions.length === this.question.maxValue) {
                        alert(`最多选择${this.question.maxValue}项`);
                    } else {
                        option.selected = true;
                    }
                }
                break;
        }
    }
}