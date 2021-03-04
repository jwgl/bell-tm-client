export interface WorkflowAction {
    UPDATE: boolean;
    DELETE: boolean;
    SUBMIT: boolean;
    COMPLETE: boolean;
}

export interface WorkflowForm {
    id: any;
    workflowInstanceId: string;
    workflowAction: WorkflowAction;
    taskVariable: TaskVariable;
    validate?: () => string[];
}

export interface TaskVariable {
    name: string;
    values: string[];
}

export type WorkflowFormConvert = (dto: any) => WorkflowForm;

type Constructor<T> = new(...args: any[]) => T;

export interface Actionable {
    workflowAction: WorkflowAction;
    taskVariable: TaskVariable;
}

export function Actionable<T extends Constructor<{}>>(Base: T): Constructor<Actionable> & T {
    return class extends Base {
        workflowAction: WorkflowAction;
        taskVariable: TaskVariable;
        constructor(...args: any[]) {
            super(...args);
            this.workflowAction = args[0].workflowAction;
            this.taskVariable = args[0].taskVariable;
        }
    };
}

