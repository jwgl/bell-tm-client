import { Questionnaire, Question, QuestionOption } from './questionnaire-form.model';

export class ResponseForm {
    id: number;
    dateSubmitted: string;
    items: ResponseItem[];
    questionnaire: Questionnaire;

    constructor(dto: { form: any, questionnaire: any }) {
        this.questionnaire = new Questionnaire(dto.questionnaire);

        if (dto.form.id) {
            this.id = dto.form.id;
            this.dateSubmitted = dto.form.dateSubmitted;
        }

        this.items = this.questionnaire.questions.map(question =>
            new ResponseItem(dto.form.items ? dto.form.items.find(item => item.question === question.id) : null, question)
        );
    }
}

export interface ResponseItemDto {
    id?: number;
    question: number;
    intValue?: number;
    textValue?: string;
    choice?: number;
    choices?: number[];
}

export class ResponseItem {
    id: number;
    question: Question;
    intValue: number;
    textValue: string;
    choice: number;
    clientDto: ResponseItemDto;

    constructor(dto: ResponseItemDto, question: Question) {
        this.question = question;
        if (dto) {
            this.id = dto.id;
            if (dto.intValue) {
                this.intValue = dto.intValue;
            }
            if (dto.textValue) {
                this.textValue = dto.textValue;
            }
            if (dto.choice) {
                this.choice = dto.choice;
            }
            if (question.options) {
                if (dto.choices) {
                    dto.choices.forEach(choice => {
                        const option = question.options.find(it => it.id === choice);
                        if (option) {
                            option.selected = true;
                        }
                    });
                }
            }
            this.clientDto = dto;
        }
    }
}

