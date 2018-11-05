export interface WorkflowForm {
    id: any;
    workflowTitle: string;
    workflowInstanceId: string;
    editable: boolean;
    validate?: () => string[];
}

export type WorkflowFormConvert = (dto: any) => WorkflowForm;
