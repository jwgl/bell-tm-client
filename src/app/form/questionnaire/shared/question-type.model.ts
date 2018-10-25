import { NumberStringOption, toNumberMap } from 'core/options';

export enum QuestionType {
    TEXT,
    SINGLE,
    MUTIPLE,
    SCALE,
}

export const QUESTION_TYPES: NumberStringOption[] = [
    { label: '问答', value: 0 },
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

export const QUESTION_TYPE_MAP: { [key: string]: string } = toNumberMap(QUESTION_TYPES);
