export enum FormStatus {
    INACTIVE,
    ACTIVE,
    CLOSED,
    REVOKED,
    UNUSED,
}

type StatusInfo = {[key in FormStatus]: {class: string, text: string}};

const STATUS_INFO: StatusInfo = {
    [FormStatus.INACTIVE]:  { class: null,      text: null},
    [FormStatus.ACTIVE]:    { class: null,      text: null},
    [FormStatus.CLOSED]:    { class: 'danger',  text: '已关闭'},
    [FormStatus.REVOKED]:   { class: 'danger',  text: '已回收'},
    [FormStatus.UNUSED]:    { class: 'danger',  text: '未使用'},
};

export function formStatusText(status: string): string {
    return STATUS_INFO[FormStatus[status]].text;
}

export function formStatusClass(status: string): string {
    return STATUS_INFO[FormStatus[status]].class;
}
