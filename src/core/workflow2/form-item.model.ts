export interface WorkflowAction {
    UPDATE: boolean;
    DELETE: boolean;
    SUBMIT: boolean;
    COMPLETE: boolean;
}
export interface WorkflowForm {
    id: any;
    workflowTitle: string;
    workflowInstanceId: string;
    workflowAction: WorkflowAction;
    validate?: () => string[];
}

export type WorkflowFormConvert = (dto: any) => WorkflowForm;

type Constructor<T> = new(...args: any[]) => T;

export interface Actionable {
    workflowAction: WorkflowAction;
}

export function Actionable<T extends Constructor<{}>>(Base: T): Constructor<Actionable> & T {
    return class extends Base {
        workflowAction: WorkflowAction;
        constructor(...args: any[]) {
            super(...args);
            this.workflowAction = args[0].workflowAction;
        }
    };
}

