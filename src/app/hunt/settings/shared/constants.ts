export enum ReviewType {
    APPLICATION,
    CHECK,
    OTHER,
}

export enum Level {
    UNIVERSITY,
    CITY,
    PROVINCE,
    NATION,
}

type ReviewTypeInfo = { [key in ReviewType]: { text: string, class: string } };

export const typeLabels: ReviewTypeInfo = {
    [ReviewType.APPLICATION]: { text: '项目申请', class: 'badge-success' },
    [ReviewType.CHECK]: { text: '项目检查', class: 'badge-info' },
    [ReviewType.OTHER]: { text: '其他', class: 'badge-secondary' },
};

type LevelInfo = { [key in Level]: { text: string, class: string } };

export const levelLabels: LevelInfo = {
    [Level.UNIVERSITY]: { text: '校级', class: 'badge-secondary' },
    [Level.CITY]: { text: '市级', class: 'badge-secondary' },
    [Level.PROVINCE]: { text: '省级', class: 'badge-secondary' },
    [Level.NATION]: { text: '国家级', class: 'badge-secondary' },
};

export const TypeList = [
    { label: '项目申请', value: 'APPLICATION' },
    { label: '项目检查', value: 'CHECK' },
    { label: '其他', value: 'OTHER' },
];

export const LevelList = [
    { label: '校级', value: 'UNIVERSITY' },
    { label: '市级', value: 'CITY' },
    { label: '省级', value: 'PROVINCE' },
    { label: '国家级', value: 'NATION' },
];
