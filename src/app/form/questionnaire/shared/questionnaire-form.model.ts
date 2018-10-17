import * as dayjs from 'dayjs';

import { NumberStringOption } from 'core/options';
import { UserScope, userScopeToString } from './user-scope.model';
import { QUESTIONNAIRE_TYPE_MAP } from './questionnaire-type.model';

export const QUESTION_TYPES: NumberStringOption[] = [
    { label: '开放', value: 0 },
    { label: '单选', value: 1 },
    { label: '多选', value: 2 },
    { label: '量表', value: 3 },
];

export const QUESTION_TYPE_OPTIONS = [{
    min: { default: 0, min: 0, max: 100, label: '输入文字最小长度' },
    max: { default: 100, min: 0, max: 250, label: '输入文字最大长度' },
    step: { default: 3, min: 1, max: 10, label: '输入框行数(1-10)' },
}, {
    min: { default: 0, min: 0, max: 100, label: '输入文字最小长度' },
    max: { default: 50, min: 0, max: 100, label: '输入文字最大长度' },
    step: { default: 1, min: 1, max: 4, label: '显示列数(1-4)' },
}, {
    min: { default: 1, min: 1, max: 10, label: '最少选几项' },
    max: { default: 4, min: 2, max: 10, label: '最多选几项' },
    step: { default: 1, min: 1, max: 4, label: '显示列数(1-4)' },
}, {
    min: { default: 1, min: 1, max: 10, label: '最小值' },
    max: { default: 5, min: 2, max: 100, label: '最大值' },
    step: { default: 1, min: 1, max: 10, label: '量表间隔(1-10)' },
}];

export class Questionnaire {
    id: number;
    pollster: { id: string, name: string };
    department: { id: string, name: string };
    type: string;
    title: string;
    prologue: string;
    epilogue: string;
    surveyScope: string;
    respondentType: string;
    oriented: UserScope[];
    restricted: UserScope[];
    anonymous: boolean;
    dateExpired: string;
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
            this.type = 'QUESTIONNAIRE';
            this.surveyScope = 'DEPARTMENT';
            this.respondentType = 'STUDENT';
            this.anonymous = true;
            this.dateExpired = dayjs().add(1, 'month').format('YYYY-MM-DDTHH:mm');
            this.questions = [];
            this.oriented = [];
            this.restricted = [];
        }
        this.removedQuestions = [];
    }

    get formTitle(): string {
        const type = QUESTIONNAIRE_TYPE_MAP[this.type];
        return this.id ? `${type}申请#${this.id}` : `新建${type}申请`;
    }

    get workflowTitle() {
        const type = QUESTIONNAIRE_TYPE_MAP[this.type];
        return `[${type}申请]#${this.id}-${this.title}`;
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
        this.options = options ? options.map(option => new QuestionOption(option)) : [];
        this.removedOptions = removedOptions ? removedOptions.map(option => new QuestionOption(option)) : [];
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
}

export class QuestionOption {
    id: number;
    ordinal: number;
    content: string;
    label: string;
    value: number;

    constructor(dto: any) {
        Object.assign(this, dto);
    }
}
