export interface WorkflowTask {
    id: string;
    name: string;
    taskKey: string;
    assigneeId: string;
    assigneeName: string;
    startTime: string;
    endTime?: string;
    resultKey?: string;
    resultValue?: string;
    resultComment?: string;
}
