import * as _ from 'lodash';

import { ResponseForm, ResponseItem, ResponseItemDto } from '../../shared/response-form.model';

declare module '../../shared/questionnaire-form.model' {
    interface QuestionOption {
        selected: boolean;
    }
}

declare module '../../shared/response-form.model' {
    interface ResponseForm {
        validate(): string[];
        toServerDto(): any;
    }

    interface ResponseItem {
        validate(): string;
        toServerDto(): any;
    }
}

ResponseForm.prototype.validate = function (this: ResponseForm): string[] {
    return this.items.map(it => it.validate()).filter(it => !!it);
};

ResponseForm.prototype.toServerDto = function (this: ResponseForm): any {
    if (this.id) {
        const items = this.items.map(it => ({
            client: it.clientDto,
            server: it.toServerDto(),
        })).filter(it => it.client || it.server);

        return {
            id: this.id,
            addedItems: items.filter(it => !it.client && it.server).map(it => it.server),
            updatedItems: items.filter(it => it.client && it.server && !_.isEqual(it.client, it.server)).map(it => it.server),
            removedItems: items.filter(it => it.client && !it.server).map(it => it.client.id),
        };
    } else {
        return {
            addedItems: this.items.map(it => it.toServerDto()).filter(it => !!it),
        };
    }
};

ResponseItem.prototype.validate = function (this: ResponseItem): string {
    if (this.question.mandatory && !this.toServerDto()) {
        return `第${this.question.ordinal + 1}题为必选题目`;
    } else {
        return null;
    }
};

ResponseItem.prototype.toServerDto = function (this: ResponseItem): ResponseItemDto {
    let response: {[key: string]: any};
    let textValue: string;

    switch (this.question.type) {
        case 0:
            if (this.textValue) {
                textValue = this.textValue.trim();
                if (textValue.length) {
                    response = { textValue };
                }
            }
            break;
        case 1:
            if (this.choice) {
                response = { choice: this.choice.id };
            } else if (this.question.openEnded && this.textValue) {
                textValue = this.textValue.trim();
                if (textValue.length) {
                    response = { textValue };
                }
            }
            break;
        case 2:
            const choices = this.question.options.filter(option => option.selected).map(option => option.id);
            if (this.question.openEnded && this.textValue) {
                textValue = this.textValue.trim();
                if (textValue) {
                    textValue = this.textValue.replace(/;/g, '；').split(/；/g).map(it => it.trim()).filter(it => !!it).join('；');
                }
            }
            if (choices.length && textValue) {
                response = { choices, textValue };
            } else if (choices.length) {
                response = { choices };
            } else if (textValue) {
                response = { textValue };
            }
            break;
        case 3:
            if (this.intValue) {
                response = { intValue: this.intValue };
            }
            break;
    }
    return response ? {
        id: this.id,
        question: this.question.id,
        ...response,
    } : undefined;
};
