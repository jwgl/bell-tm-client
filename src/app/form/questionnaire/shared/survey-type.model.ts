import { StringStringOption, toStringMap } from 'core/options';

export const SURVEY_TYPES: StringStringOption[] = [
    { value: 'QUESTIONNAIRE',   label: '调查问卷' },
    { value: 'ENTRY_FORM',      label: '报名表'},
    { value: 'BALLOT_SHEET',    label: '投票单' },
    { value: 'INFO_COLLECTION', label: '信息采集' },
];

export const SURVEY_TYPE_MAP: { [key: string]: string } = toStringMap(SURVEY_TYPES);
