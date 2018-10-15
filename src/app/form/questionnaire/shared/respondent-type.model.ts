import { StringStringOption } from 'core/options';

export const RESPONDENT_TYPES: StringStringOption[] = [
    { value: 'TEACHER', label: '教师' },
    { value: 'STUDENT', label: '学生' },
];

export const RESPONDENT_TYPE_MAP: { [key: string]: string } = RESPONDENT_TYPES.reduce((result, item) => {
    result[item.value] = item.label;
    return result;
}, {});
