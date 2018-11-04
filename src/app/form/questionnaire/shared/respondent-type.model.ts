import { StringStringOption, toStringMap } from 'core/options';

export const RESPONDENT_TYPES: StringStringOption[] = [
    { value: 'TEACHER', label: '教师', alt: '老师' },
    { value: 'STUDENT', label: '学生', alt: '同学' },
];

export const RESPONDENT_TYPE_MAP: { [key: string]: string } = toStringMap(RESPONDENT_TYPES);
export const RESPONDENT_TYPE_ALT_MAP: { [key: string]: string } = toStringMap(RESPONDENT_TYPES, 'alt');
