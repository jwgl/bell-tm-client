import { NumberStringOption } from 'core/options';

export const SURVEY_SCOPES: NumberStringOption[] = [
    { value: 0, label: '校级' },
    { value: 1, label: '院级' },
    { value: 2, label: '班级' },
];

export const SURVEY_SCOPE_MAP: { [key: number]: string } = SURVEY_SCOPES.reduce((result, item) => {
    result[item.value] = item.label;
    return result;
}, {});
