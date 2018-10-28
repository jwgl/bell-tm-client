import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ResponseItem } from '../../shared/response-form.model';
import { Question, QuestionOption } from '../../shared/questionnaire-form.model';
import { QuestionType } from '../../shared/question-type.model';

@Component({
    selector: 'tm-ballot-response-item-editor',
    styleUrls: ['ballot-response-item-editor.component.scss'],
    templateUrl: 'ballot-response-item-editor.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BallotResponseItemEditorComponent {
    @Input()
    responseItem: ResponseItem;

    constructor() { }

    get question(): Question {
        return this.responseItem.question;
    }

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
