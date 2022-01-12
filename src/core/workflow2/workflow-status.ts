export enum WorkflowStatus {
    CREATED,
    SUBMITTED,
    CHECKED,
    REJECTED,
    APPROVED,
    SENT_BACK,
    CLOSED,
    REVOKED,
    PROGRESS,
    FINISHED,
    DELETED,
    CONFIRMED,
    TERMINATED,
    STEP1,
    STEP2,
    STEP3,
    STEP4,
    STEP5,
    STEP6,
    STEP7,
    STEP8,
    STEP9,
}

type StatusInfo = {[key in WorkflowStatus]: {class: string, text: string, userTask: string}};

const STATUS_INFO: StatusInfo = {
    [WorkflowStatus.CREATED]:   { class: 'secondary', text: '未提交', userTask: '未提交'},
    [WorkflowStatus.SUBMITTED]: { class: 'info',      text: '待审核', userTask: '提交'},
    [WorkflowStatus.CHECKED]:   { class: 'info',      text: '待审批', userTask: '审核'},
    [WorkflowStatus.REJECTED]:  { class: 'warning',   text: '退回',   userTask: '退回'},
    [WorkflowStatus.APPROVED]:  { class: 'success',   text: '已审批', userTask: '审批'},
    [WorkflowStatus.SENT_BACK]:  { class: 'warning',   text: '驳回', userTask: '审批'},
    [WorkflowStatus.REVOKED]:   { class: 'danger',    text: '回收',   userTask: '回收'},
    [WorkflowStatus.PROGRESS]:  { class: 'primary',   text: '处理中', userTask: '开始处理'},
    [WorkflowStatus.FINISHED]:  { class: 'success',   text: '完成',   userTask: '处理完成'},
    [WorkflowStatus.CLOSED]:    { class: 'danger',    text: '关闭',   userTask: '关闭'},
    [WorkflowStatus.DELETED]:   { class: 'danger',    text: '删除',   userTask: '删除'},
    [WorkflowStatus.CONFIRMED]: { class: 'success',   text: '已确认', userTask: '确认'},
    [WorkflowStatus.TERMINATED]:{ class: 'danger',    text: '已终止', userTask: '终止'},
    [WorkflowStatus.STEP1]:     { class: 'info',      text: '步骤1',  userTask: '步骤1'},
    [WorkflowStatus.STEP2]:     { class: 'info',      text: '步骤2',  userTask: '步骤2'},
    [WorkflowStatus.STEP3]:     { class: 'info',      text: '步骤3',  userTask: '步骤3'},
    [WorkflowStatus.STEP4]:     { class: 'info',      text: '步骤4',  userTask: '步骤4'},
    [WorkflowStatus.STEP5]:     { class: 'info',      text: '步骤5',  userTask: '步骤5'},
    [WorkflowStatus.STEP6]:     { class: 'info',      text: '步骤6',  userTask: '步骤6'},
    [WorkflowStatus.STEP7]:     { class: 'info',      text: '步骤7',  userTask: '步骤7'},
    [WorkflowStatus.STEP8]:     { class: 'info',      text: '步骤8',  userTask: '步骤8'},
    [WorkflowStatus.STEP9]:     { class: 'info',      text: '步骤9',  userTask: '步骤9'},
};

export function workflowStatusText(status: string): string {
    return STATUS_INFO[WorkflowStatus[status]].text;
}

export function workflowStatusClass(status: string): string {
    return STATUS_INFO[WorkflowStatus[status]].class;
}

export function userTaskStatusText(status: string): string {
    return STATUS_INFO[WorkflowStatus[status]].userTask;
}

export interface StatusConverter {
    toText(status: string): string;
    toClass(status: string): string;
}
