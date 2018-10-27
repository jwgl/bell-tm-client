import * as _ from 'lodash';

import { Questionnaire, Question, QuestionOption } from '../../shared/questionnaire-form.model';
import { QuestionType } from '../../shared/question-type.model';

declare module '../../shared/questionnaire-form.model' {
    interface Questionnaire {
        addItem(item: Question): void;
        updateItem(item: Question): void;
        removeItem(item: Question): void;
        moveupItem(item: Question): void;
        movedownItem(item: Question): void;
        toServerDto(): any;
    }

    interface Question {
        clone(): Question;
        addItem(item: QuestionOption): void;
        updateItem(item: QuestionOption): void;
        removeItem(item: QuestionOption): void;
        moveupItem(item: QuestionOption): void;
        movedownItem(item: QuestionOption): void;
        toServerDto(): any;
        markUpdated(): void;
        __updated: boolean;
    }

    interface QuestionOption {
        clone(): QuestionOption;
        toServerDto(): any;
        markUpdated(): void;
        __updated: boolean;
    }
}

Questionnaire.prototype.addItem = function (this: Questionnaire, item: Question): void {
    this.questions.push(item);
};

Questionnaire.prototype.updateItem = function (this: Questionnaire, item: Question): void {
    this.questions = [...this.questions.slice(0, item.ordinal), item, ...this.questions.slice(item.ordinal + 1)];
    item.markUpdated();
};

Questionnaire.prototype.removeItem = function (this: Questionnaire, item: Question): void {
    this.questions.splice(item.ordinal, 1);
    if (item.id) {
        this.removedQuestions.push(item);
        this.questions.forEach((it, index) => {
            if (it.ordinal !== index) {
                it.ordinal = index;
                it.markUpdated();
            };
        });
    }
};

Questionnaire.prototype.moveupItem = function (this: Questionnaire, item: Question): void {
    const index = item.ordinal;
    this.questions[index] = this.questions[index - 1];
    this.questions[index].ordinal = index;
    this.questions[index].markUpdated();
    this.questions[index - 1] = item;
    this.questions[index - 1].ordinal = index - 1;
    this.questions[index - 1].markUpdated();
};

Questionnaire.prototype.movedownItem = function (this: Questionnaire, item: Question): void {
    const index = item.ordinal;
    this.questions[index] = this.questions[index + 1];
    this.questions[index].ordinal = index;
    this.questions[index].markUpdated();
    this.questions[index + 1] = item;
    this.questions[index + 1].ordinal = index + 1;
    this.questions[index + 1].markUpdated();
};

Questionnaire.prototype.toServerDto = function (this: Questionnaire): any {
    const { id, questions, removedQuestions, ...others } = this;

    return id ?
        {
            id,
            ...others,
            addedQuestions: this.questions.filter(it => !it.id).map(it => it.toServerDto()),
            updatedQuestions: this.questions.filter(it => it.__updated).map(it => it.toServerDto()),
            removedQuestions: this.removedQuestions.map(it => it.id),
        } : {
            ...others,
            addedQuestions: this.questions.map(it => it.toServerDto()),
        };
};

Question.prototype.clone = function (this: Question): Question {
    return new Question(_.cloneDeep(this));
};

Question.prototype.markUpdated = function (this: Question): void {
    if (this.id) {
        this.__updated = true;
    }
};

Question.prototype.addItem = function (this: Question, item: QuestionOption): void {
    this.options.push(item);
};

Question.prototype.updateItem = function (this: Question, item: QuestionOption): void {
    this.options = [...this.options.slice(0, item.ordinal), item, ...this.options.slice(item.ordinal + 1)];
    item.markUpdated();
};

Question.prototype.removeItem = function (this: Question, item: QuestionOption): void {
    this.options.splice(item.ordinal, 1);
    if (item.id) {
        this.removedOptions.push(item);
        this.options.forEach((it, index) => {
            if (it.ordinal !== index) {
                it.ordinal = index;
                it.markUpdated();
            };
        });
    }
    this.markUpdated();
};

Question.prototype.moveupItem = function (this: Question, item: QuestionOption): void {
    const index = item.ordinal;
    this.options[index] = this.options[index - 1];
    this.options[index].ordinal = index;
    this.options[index].markUpdated();
    this.options[index - 1] = item;
    this.options[index - 1].ordinal = index - 1;
    this.options[index - 1].markUpdated();
    this.markUpdated();
};

Question.prototype.movedownItem = function (this: Question, item: QuestionOption): void {
    const index = item.ordinal;
    this.options[index] = this.options[index + 1];
    this.options[index].ordinal = index;
    this.options[index].markUpdated();
    this.options[index + 1] = item;
    this.options[index + 1].ordinal = index + 1;
    this.options[index + 1].markUpdated();
    this.markUpdated();
};

Question.prototype.toServerDto = function (this: Question): any {
    const { id, __updated, options, removedOptions, ...others } = this;
    return id ?
        {
            id,
            ...others,
            addedOptions: options.filter(it => !it.id).map(it => it.toServerDto()),
            updatedOptions: options.filter(it => it.__updated).map(it => it.toServerDto()),
            removedOptions: removedOptions.map(it => it.id),
        } : {
            ...others,
            addedOptions: options.map(it => it.toServerDto()),
        };
};

QuestionOption.prototype.clone = function (this: QuestionOption): QuestionOption {
    const { question, ...others } = this;
    return new QuestionOption(this.question, others);
};

QuestionOption.prototype.toServerDto = function (this: QuestionOption): any {
    const { id, __updated, question, ...others } = this;
    return id ?
        {
            id,
            ...others,
        } : {
            ...others,
        };
};

QuestionOption.prototype.markUpdated = function (this: QuestionOption): void {
    if (this.id) {
        this.__updated = true;
    }
};
