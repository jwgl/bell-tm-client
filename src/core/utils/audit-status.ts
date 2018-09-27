import { AuditStatus } from '../constants/audit-status';

type StatusInfo = {[key in AuditStatus]: {class: string, text: string, workitem: string}};

const STATUS_INFO: StatusInfo = {
    [AuditStatus.CREATED]:   { class: 'secondary', text: '未提交', workitem: '未提交'},
    [AuditStatus.SUBMITTED]: { class: 'info',      text: '待审核', workitem: '提交'},
    [AuditStatus.CHECKED]:   { class: 'info',      text: '待审批', workitem: '审核'},
    [AuditStatus.REJECTED]:  { class: 'warning',   text: '退回',   workitem: '退回'},
    [AuditStatus.APPROVED]:  { class: 'success',   text: '已审批', workitem: '审批'},
    [AuditStatus.REVOKED]:   { class: 'danger',    text: '回收',   workitem: '回收'},
    [AuditStatus.PROGRESS]:  { class: 'primary',   text: '处理中', workitem: '开始处理'},
    [AuditStatus.FINISHED]:  { class: 'success',   text: '完成',   workitem: '处理完成'},
    [AuditStatus.CLOSED]:    { class: 'danger',    text: '关闭',   workitem: '关闭'},
    [AuditStatus.DELETED]:   { class: 'danger',    text: '删除',   workitem: '删除'},
    [AuditStatus.STEP1]:     { class: 'info',      text: '步骤1',  workitem: '步骤1'},
    [AuditStatus.STEP2]:     { class: 'info',      text: '步骤2',  workitem: '步骤2'},
    [AuditStatus.STEP3]:     { class: 'info',      text: '步骤3',  workitem: '步骤3'},
    [AuditStatus.STEP4]:     { class: 'info',      text: '步骤4',  workitem: '步骤4'},
    [AuditStatus.STEP5]:     { class: 'info',      text: '步骤5',  workitem: '步骤5'},
    [AuditStatus.STEP6]:     { class: 'info',      text: '步骤6',  workitem: '步骤6'},
    [AuditStatus.STEP7]:     { class: 'info',      text: '步骤7',  workitem: '步骤7'},
    [AuditStatus.STEP8]:     { class: 'info',      text: '步骤8',  workitem: '步骤8'},
    [AuditStatus.STEP9]:     { class: 'info',      text: '步骤9',  workitem: '步骤9'},
};

export function auditStatusText(status: string): string {
    return STATUS_INFO[AuditStatus[status]].text;
}

export function auditStatusClass(status: string): string {
    return STATUS_INFO[AuditStatus[status]].class;
}

export function workitemStatusText(status: string): string {
    return STATUS_INFO[AuditStatus[status]].workitem;
}
