export enum CompleteAction {
    ACCEPT,
    REJECT,
    SUBMIT,
    SEND_BACK,
    TERMINATE,
}

type StatusInfo = {[key in CompleteAction]: {class: string, text: string}};

const STATUS_INFO: StatusInfo = {
    [CompleteAction.ACCEPT]:     { class: 'success', text: '同意' },
    [CompleteAction.REJECT]:     { class: 'warning', text: '退回' },
    [CompleteAction.SUBMIT]:     { class: 'primary', text: '提交' },
    [CompleteAction.SEND_BACK]:  { class: 'info',    text: '驳回' },
    [CompleteAction.TERMINATE]:  { class: 'danger',  text: '终止' },
};

export function completeActionText(status: string): string {
    return STATUS_INFO[CompleteAction[status]].text;
}

export function completeActionClass(status: string): string {
    return STATUS_INFO[CompleteAction[status]].class;
}
