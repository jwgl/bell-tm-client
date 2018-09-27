export const paperTypeLabels = [
    { id: 1, label: '本科论文' },
    { id: 2, label: '硕士论文' },
    { id: 3, label: '课程论文' },
];

export enum DualAuditStatus {
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
type DualStatusInfo = { [key in DualAuditStatus]: { text: string, class: string } };

export const statusLabels: DualStatusInfo = {
    [DualAuditStatus.CREATED]: { text: '未提交', class: 'badge-secondary' },
    [DualAuditStatus.STEP1]: { text: '提交', class: 'badge-info', },
    [DualAuditStatus.STEP2]: { text: '初审通过', class: 'badge-success' },
    [DualAuditStatus.STEP3]: { text: '论文提交', class: 'badge-secondary' },
    [DualAuditStatus.STEP4]: { text: '导师审核中', class: 'badge-secondary' },
    [DualAuditStatus.STEP5]: { text: '论文退回', class: 'badge-warning' },
    [DualAuditStatus.REJECTED]: { text: '初审退回', class: 'badge-warning' },
    [DualAuditStatus.CLOSED]: { text: '关闭', class: 'badge-danger' },
    [DualAuditStatus.FINISHED]: { text: '论文通过', class: 'badge-success' },
};
