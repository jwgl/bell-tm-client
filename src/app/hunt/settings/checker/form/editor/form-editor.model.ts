import {CheckerForm} from '../../shared/form.model';

declare module '../../shared/form.model' {
    interface CheckerForm {
        toServerDto(): any;
    }
}

CheckerForm.prototype.toServerDto = function(this: CheckerForm): any {
    return {
        teacherId: this.teacherId,
        departmentId: this.departmentId,
    };
};
