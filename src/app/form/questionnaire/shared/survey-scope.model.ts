import { StringStringOption, toStringMap } from 'core/options';

export const SURVEY_SCOPES: StringStringOption[] = [
    { value: 'SCHOOL',      label: '校级' },
    { value: 'DEPARTMENT',  label: '院级' },
    { value: 'ADMIN_CLASS', label: '班级' },
];

export const SURVEY_SCOPE_MAP: { [key: string]: string } = toStringMap(SURVEY_SCOPES);
