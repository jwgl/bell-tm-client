export const paperTypeLabels = [
    {id: 1, label: '本科论文'},
    {id: 2, label: '硕士论文'},
    {id: 3, label: '课程论文'},
];

export enum DualdegreeAuditStatus {
    CREATED,
    REJECTED,
    CLOSED,
    FINISHED,
    STEP1,
    STEP2,
    STEP3,
    STEP4,
    STEP5,
}
type DualdegreeStatusInfo = {[key in DualdegreeAuditStatus]: {text: string, class: string}};

export const statusLabels: DualdegreeStatusInfo = {
    [DualdegreeAuditStatus.CREATED]:   {text: '未提交', class: 'badge-secondary'},
    [DualdegreeAuditStatus.STEP1]:     {text: '提交', class: 'badge-info', },
    [DualdegreeAuditStatus.STEP2]:     {text: '初审通过', class: 'badge-success'},
    [DualdegreeAuditStatus.STEP3]:     {text: '论文提交', class: 'badge-secondary'},
    [DualdegreeAuditStatus.STEP4]:     {text: '导师审核中', class: 'badge-secondary'},
    [DualdegreeAuditStatus.STEP5]:     {text: '论文退回', class: 'badge-warning'},
    [DualdegreeAuditStatus.REJECTED]:  {text: '初审退回', class: 'badge-warning'},
    [DualdegreeAuditStatus.CLOSED]:    {text: '关闭', class: 'badge-danger'},
    [DualdegreeAuditStatus.FINISHED]:  {text: '论文通过', class: 'badge-success'},
};
