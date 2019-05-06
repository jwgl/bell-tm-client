import {TaskForm} from '../shared/form.model';

declare module '../shared/form.model' {
    interface TaskForm {
        toServerDto(): any;
    }
}

TaskForm.prototype.toServerDto = function(this: TaskForm): any {
    return {
        title: this.title,
        content: this.content,
        startDate: this.startDate,
        endDate: this.endDate,
        type: this.type,
        remind: this.remind,
        ban: this.ban,
        attach: this.attach,
    };
};
