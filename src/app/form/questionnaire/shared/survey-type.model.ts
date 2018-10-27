import { StringStringOption, toStringMap } from 'core/options';

export enum SurveyType {
    /**
     * 调查问卷
     */
    QUESTIONNAIRE = 'QUESTIONNAIRE',

    /**
     * 报名表
     */
    ENTRY_FORM = 'ENTRY_FORM',

    /**
     * 投票单
     */
    BALLOT_SHEET = 'BALLOT_SHEET',

    /**
     * 信息采集
     */
    INFO_COLLECTION = 'INFO_COLLECTION',
}

export const SURVEY_TYPES: StringStringOption[] = [
    { value: SurveyType.QUESTIONNAIRE,   label: '调查问卷', alt: '调查'},
    { value: SurveyType.ENTRY_FORM,      label: '报名表',   alt: '报名'},
    { value: SurveyType.BALLOT_SHEET,    label: '投票单',   alt: '投票'},
    { value: SurveyType.INFO_COLLECTION, label: '信息采集', alt: '填报'},
];

export const SURVEY_TYPE_MAP: { [key: string]: string } = toStringMap(SURVEY_TYPES);
export const SURVEY_TYPE_ALT_MAP: { [key: string]: string } = toStringMap(SURVEY_TYPES, 'alt');

export const SURVEY_TYPE_OPTIONS = {
    [SurveyType.QUESTIONNAIRE]: {
        anonymous: { default: true, disabled: false, visible: true },
    },
    [SurveyType.ENTRY_FORM]: {
        anonymous: { default: false, disabled: true, visible: false }
    },
    [SurveyType.BALLOT_SHEET]: {
        anonymous: { default: true, disabled: false, visible: true },
    },
    [SurveyType.INFO_COLLECTION]: {
        anonymous: { default: false, disabled: true, visible: false }
    },
}
