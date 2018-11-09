import { TaskForm } from '../../../../settings/task/shared/form.model';

declare module '../../../../settings/task/shared/form.model' {
    interface TaskForm {
        status: string;
        countApplication: number;
    }
}
