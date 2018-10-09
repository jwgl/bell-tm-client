import * as _ from 'lodash';

import { Questionnaire, Question, QuestionOption } from '../../shared/questionnaire-form.model';

declare module '../../shared/questionnaire-form.model' {
    interface Questionnaire {
        addItem(item: Question): void;
        updateItem(item: Question): void;
        removeItem(item: Question): void;
        isValid(): boolean;
        toServerDto(): any;
    }

    interface Question {
        clone(): Question;
        addItem(item: QuestionOption): void;
        removeItem(item: QuestionOption): void;
        moveupItem(item: QuestionOption): void;
        movedownItem(item: QuestionOption): void;
        isValid(): boolean;
        toServerDto(): any;
        markUpdated(): void;
        __updated: boolean;
    }

    interface QuestionOption {
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
    const index = this.questions.indexOf(item);
    this.questions.splice(index, 1);
    if (item.id) {
        this.removedQuestions.push(item);
    }
};

Questionnaire.prototype.isValid = function (this: Questionnaire): boolean {
    return this.title
        && this.title.length <= 100
        && (!this.prologue || this.prologue.length <= 500)
        && (!this.epilogue || this.epilogue.length <= 250)
        && this.dateExpired
        && this.questions.every(question => question.isValid());
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

Question.prototype.addItem = function (this: Question, item: QuestionOption): void {
    this.options.push(item);
};

Question.prototype.markUpdated = function (this: Question): void {
    if (this.id) {
        this.__updated = true;
    }
};

Question.prototype.removeItem = function (this: Question, item: QuestionOption): void {
    this.options.splice(item.ordinal, 1);
    this.options.forEach((it, index) => it.ordinal = index);
    if (item.id) {
        this.removedOptions.push(item);
    }
};

Question.prototype.moveupItem = function (this: Question, item: QuestionOption): void {
    const index = item.ordinal;
    this.options[index] = this.options[index - 1];
    this.options[index].ordinal = index;
    this.options[index].markUpdated();
    this.options[index - 1] = item;
    this.options[index - 1].ordinal = index - 1;
    this.options[index - 1].markUpdated();
};

Question.prototype.movedownItem = function (this: Question, item: QuestionOption): void {
    const index = item.ordinal;
    this.options[index] = this.options[index + 1];
    this.options[index].ordinal = index;
    this.options[index].markUpdated();
    this.options[index + 1] = item;
    this.options[index + 1].ordinal = index + 1;
    this.options[index + 1].markUpdated();
};

Question.prototype.isValid = function (this: Question): boolean {
    return this.title && this.title.length <= 100
        && this.content && this.content.length <= 500
        && (this.type === 0 || this.type === 3 || this.options.length > 1);
};

Question.prototype.toServerDto = function (this: Question): any {
    const { id, options, removedOptions, ...others } = this;
    return id ?
        {
            id,
            ...others,
            addedOptions: options.filter(it => !it.id).map(it => it.toServerDto()),
            updatedOption: options.filter(it => it.__updated).map(it => it.toServerDto()),
            removedOptions: removedOptions.map(it => it.id),
        } : {
            ...others,
            addedOptions: options.map(it => it.toServerDto()),
        };
};

QuestionOption.prototype.toServerDto = function (this: QuestionOption): any {
    if (this.id) {
        return this;
    } else {
        const { id, ...dto } = this;
        return dto;
    }
};

QuestionOption.prototype.markUpdated = function (this: QuestionOption): void {
    if (this.id) {
        this.__updated = true;
    }
};
