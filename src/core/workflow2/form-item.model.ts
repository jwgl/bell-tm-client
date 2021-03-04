export interface FormActions {
    UPDATE: boolean;
    DELETE: boolean;
    SUBMIT: boolean;
    COMPLETE: boolean;
}

export interface WorkflowForm {
    id: any;
    workflowInstanceId: string;
    formActions: FormActions;
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
    formActions: FormActions;
    taskVariable: TaskVariable;
}

export function Actionable<T extends Constructor<{}>>(Base: T): Constructor<Actionable> & T {
    return class extends Base {
        formActions: FormActions;
        taskVariable: TaskVariable;
        constructor(...args: any[]) {
            const form = args[0].form;
            super(form);
            this.formActions = args[0].formActions;
            this.taskVariable = args[0].taskVariable;
        }
    };
}
