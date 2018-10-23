import { StringStringOption, toStringMap } from 'core/options';

export const RESPONSE_VISIBILITIES: StringStringOption[] = [
    { value: 'INVISIBLE',             label: '不可见' },
    { value: 'VISIBLE_AFTER_SUBMIT',  label: '提交后可见'},
    { value: 'VISIBLE_BEFORE_SUBMIT', label: '提交前可见' },
];

export const RESPONSE_VISIBILITIES_MAP: { [key: string]: string } = toStringMap(RESPONSE_VISIBILITIES);
