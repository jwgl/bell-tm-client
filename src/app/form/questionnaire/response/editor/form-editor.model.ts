import * as _ from 'lodash';

import { Questionnaire, Question, QuestionOption } from '../../shared/questionnaire-form.model';
import { ResponseForm, ResponseItem, ResponseItemDto } from '../../shared/response-form.model';

declare module '../../shared/questionnaire-form.model' {
    interface QuestionOption {
        selected: boolean;
    }
}

declare module '../../shared/response-form.model' {
    interface ResponseForm {
        isValid(): boolean;
        toServerDto(): any;
    }

    interface ResponseItem {
        isValid(): boolean;
        toServerDto(): any;
    }
}

ResponseForm.prototype.isValid = function (this: ResponseForm): boolean {
    return true;
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

ResponseItem.prototype.isValid = function (this: ResponseItem): boolean {
    return true;
};

ResponseItem.prototype.toServerDto = function (this: ResponseItem): ResponseItemDto {
    let response
    switch (this.question.type) {
        case 0:
            if (this.textValue) {
                const textValue = this.textValue.trim();
                if (textValue.length) {
                    response = { textValue };
                }
            }
            break;
        case 1:
            if (this.choice) {
                response = { choice: this.choice.id };
            } else if (this.question.openEnded && this.textValue) {
                const textValue = this.textValue.trim();
                if (textValue.length) {
                    response = { textValue };
                }
            }
            break;
        case 2:
            const choices = this.question.options.filter(option => option.selected).map(option => option.id);
            const textValue = this.question.openEnded && this.textValue ? this.textValue.replace(/;/g, '；').split(/；/g).map(it => it.trim()).filter(it => !!it).join('；') : null
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
