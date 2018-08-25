export interface WorkflowForm {
    id: any;
    workflowTitle: string;
    workflowInstanceId: string;
    editable: boolean;
}

export type WorkflowFormConvert = (dto: any) => WorkflowForm;