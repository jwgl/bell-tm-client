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

export enum Conclusion {
    OK, // 通过
    VETO, // 不通过
    DELAY // 暂缓通过
}

export enum ProjectStatus {
    CREATED, // 未立项
    INHAND, // 在研
    FINISHED, // 结题
    CUTOUT // 终止
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

type ConclusionInfo = { [key in Conclusion]: { text: string, class: string } };

export const conclusionLabels: ConclusionInfo = {
    [Conclusion.OK]: { text: '通过', class: 'badge-success' },
    [Conclusion.VETO]: { text: '不通过', class: 'badge-danger' },
    [Conclusion.DELAY]: { text: '暂缓通过', class: 'badge-warning' },
};

type ProjectStatusInfo = { [key in ProjectStatus]: { text: string, class: string } };

export const projectStatusLabels: ProjectStatusInfo = {
    [ProjectStatus.CREATED]: { text: '未立项', class: 'badge-secondary' },
    [ProjectStatus.INHAND]: { text: '在研', class: 'badge-info' },
    [ProjectStatus.FINISHED]: { text: '结题', class: 'badge-success' },
    [ProjectStatus.CUTOUT]: { text: '终止', class: 'badge-danger' },
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

export const ConclusionList = [
    { label: '通过', value: 'OK' },
    { label: '不通过', value: 'VETO' },
    { label: '暂缓通过', value: 'DELAY' },
];

export const ReportTypeList = [
    { label: '年度', value: 2 },
    { label: '中期', value: 3 },
    { label: '结题', value: 4 },
];

export const ChangeTypeList = [
    { label: '项目负责人', value: 1 },
    { label: '延期', value: 2 },
    { label: '项目名称', value: 3 },
    { label: '研究内容重大调整', value: 4 },
    { label: '自行中止项目', value: 5 },
    { label: '改变成果形式', value: 6 },
    { label: '变更参与人', value: 7 },
    { label: '其他', value: 8 },
];
