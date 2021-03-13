import { StatusConverter } from 'core/workflow2/workflow-status';

export interface Department {
    id: string;
    name: string;
}

export enum ItemWorkflowStatus {
    CREATED,
    SUBMITTED,
    CONFIRMED,
    TERMINATED,
    CLOSED,
}

type ItemStatusInfo = {[key in ItemWorkflowStatus]: {class: string, text: string}};

const ITEM_STATUS_INFO: ItemStatusInfo = {
    [ItemWorkflowStatus.CREATED]:   { class: null,        text: null},
    [ItemWorkflowStatus.SUBMITTED]: { class: 'info',      text: '待确认'},
    [ItemWorkflowStatus.CONFIRMED]: { class: 'success',   text: '已确认'},
    [ItemWorkflowStatus.TERMINATED]:{ class: 'danger',    text: '已终止'},
    [ItemWorkflowStatus.CLOSED]:    { class: 'danger',    text: '关闭'  },
};

export class ItemStatusConverter implements StatusConverter {
    toText(status: string): string {
        return ITEM_STATUS_INFO[ItemWorkflowStatus[status]].text;
    }
    toClass(status: string): string {
        return ITEM_STATUS_INFO[ItemWorkflowStatus[status]].class;
    }
}