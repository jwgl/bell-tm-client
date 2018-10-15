import { NumberStringOption } from 'core/options';

export const RESPONDENT_TYPES: NumberStringOption[] = [
    { value: 1, label: '教师' },
    { value: 2, label: '学生' },
];

export const RESPONDENT_TYPE_MAP: { [key: number]: string } = RESPONDENT_TYPES.reduce((result, item) => {
    result[item.value] = item.label;
    return result;
}, {});
