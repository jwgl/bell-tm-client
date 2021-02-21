export enum WorkflowResult {
    START_UP,
    ACCEPT,
    REJECT,
    SUBMIT,
    SEND_BACK,
    TERMINATE,
}

type StatusInfo = { [key in WorkflowResult]: { text: string } };

const STATUS_INFO: StatusInfo = {
    [WorkflowResult.START_UP]:  { text: '发起' },
    [WorkflowResult.ACCEPT]:    { text: '同意' },
    [WorkflowResult.REJECT]:   { text: '退回' },
    [WorkflowResult.SUBMIT]:    { text: '提交' },
    [WorkflowResult.SEND_BACK]: { text: '驳回' },
    [WorkflowResult.TERMINATE]: { text: '终止' },
};

export function workflowResultText(status: string): string {
    if (STATUS_INFO[WorkflowResult[status]]) {
        return STATUS_INFO[WorkflowResult[status]].text;
    } else{
        return undefined;
    }
}
