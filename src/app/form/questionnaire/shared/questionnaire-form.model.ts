import * as dayjs from 'dayjs';

import { UserScope, userScopeToString } from './user-scope.model';
import { SURVEY_TYPE_MAP } from './survey-type.model';
import { QuestionType, QUESTION_TYPE_OPTIONS } from './question-type.model';

export class Questionnaire {
    id: number;
    pollster: { id: string, name: string };
    department: { id: string, name: string };
    title: string;
    prologue: string;
    epilogue: string;
    surveyType: string;
    surveyScope: string;
    respondentType: string;
    oriented: UserScope[];
    restricted: UserScope[];
    anonymous: boolean;
    responseVisibility: string;
    dateExpired: string;
    hashId: string;
    workflowInstanceId: string;
    status: string;
    questions: Question[];
    removedQuestions: Question[];

    constructor(dto: any) {
        if (dto && dto.id) {
            var { questions, ...others } = dto;
            Object.assign(this, others);
            this.questions = questions.map((question: any) => new Question(question));
        } else {
            Object.assign(this, ...dto);
            this.surveyType = 'QUESTIONNAIRE';
            this.surveyScope = 'DEPARTMENT';
            this.respondentType = 'STUDENT';
            this.responseVisibility = 'INVISIBLE';
            this.anonymous = true;
            this.dateExpired = dayjs().add(1, 'month').format('YYYY-MM-DDTHH:mm');
            this.questions = [];
            this.oriented = [];
            this.restricted = [];
        }
        this.removedQuestions = [];
    }

    get formTitle(): string {
        const type = SURVEY_TYPE_MAP[this.surveyType];
        return this.id ? `${type}#${this.id}` : `新建${type}`;
    }

    get workflowTitle() {
        return `${this.formTitle}-${this.title}`;
    }

    get orientedText() {
        return this.userScopesText(this.oriented);
    }

    get restrictedText() {
        return this.userScopesText(this.restricted);
    }

    private userScopesText(userScopes: UserScope[]) {
        return userScopes && userScopes.length > 0 ? userScopes
            .map(userScope => userScopeToString(userScope, this.respondentType))
            .join(', ') : '<未设置>';
    }
}

export class Question {
    id: number;
    ordinal: number;
    title: string;
    content: string;
    type: number;
    mandatory: boolean;
    openEnded: boolean;
    openLabel: string;
    minValue: number;
    maxValue: number;
    stepValue: number;
    options: QuestionOption[];
    removedOptions: QuestionOption[]

    constructor(dto: any) {
        var { options, removedOptions, ...others } = dto;
        Object.assign(this, others);
        this.options = options ? options.map(option => new QuestionOption(this, option)) : [];
        this.removedOptions = removedOptions ? removedOptions.map(option => new QuestionOption(this, option)) : [];
    }

    static newInstance(ordinal: number) {
        const question = new Question({
            ordinal: ordinal,
            type: 1,
            mandatory: true,
            openEnded: false,
        });
        question.minValue = question.typeOptions.min.default;
        question.maxValue = question.typeOptions.max.default;
        question.stepValue = question.typeOptions.step.default;
        return question;
    }

    get scaleMin(): number {
        return this.minValue;
    }

    get scaleMax(): number {
        return this.minValue + (this.scaleCount - 1) * this.scaleStep;
    }

    get scaleStep(): number {
        return this.stepValue;
    }

    get scaleCount(): number {
        return Math.round((this.maxValue - this.minValue + 1) / this.scaleStep);
    }

    get scaleValues(): number[] {
        const scales = [];
        for (var i = this.minValue; i <= this.maxValue; i += this.scaleStep) {
            scales.push(i);
        }
        return scales;
    }

    get typeOptions() {
        return QUESTION_TYPE_OPTIONS[this.type];
    }

    get controlId() {
        return `q-${this.ordinal}`;
    }

    get controlName() {
        return this.controlId;
    }

    get openControlId() {
        return `q-${this.ordinal}-o`;
    }

    get openControlName() {
        if (this.type === QuestionType.SINGLE) {
            return this.controlName;
        } else {
            return this.openControlId;
        }
    }

    get textValueName() {
        return `q-${this.ordinal}-t`
    }
}

export class QuestionOption {
    id: number;
    ordinal: number;
    content: string;
    label: string;
    value: number;
    question: Question;
    constructor(question: Question, dto: any) {
        this.question = question;
        Object.assign(this, dto);
    }

    get controlId(): string {
        return `q-${this.question.ordinal}-${this.ordinal}`;
    }

    get controlName(): string {
        switch (this.question.type) {
            case QuestionType.SINGLE:
                return this.question.controlName;
            case QuestionType.MUTIPLE:
                return this.controlId;
        }
    }
}
