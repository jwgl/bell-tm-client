import { StringStringOption } from 'core/options';

export const QUESTIONNAIRE_TYPES: StringStringOption[] = [
    { value: 'QUESTIONNAIRE', label: '问卷' },
    { value: 'VOTE', label: '投票' },
    { value: 'FORM', label: '表单' },
];

export const QUESTIONNAIRE_TYPE_MAP: { [key: string]: string } = QUESTIONNAIRE_TYPES.reduce((result, item) => {
    result[item.value] = item.label;
    return result;
}, {});
