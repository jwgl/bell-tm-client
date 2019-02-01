import { ProjectForm } from '../../../application/form/shared/form.model';

declare module '../../../application/form/shared/form.model' {
    interface ProjectForm {
        code: string;
        dateStarted: string;
        middleYear: number;
        knotYear: number;
        subtypeObject: any;
        toServerDto(): any;
    }
}

ProjectForm.prototype.toServerDto = function(this: ProjectForm): any {
    return {
        code: this.code,
        principalId: this.principalId,
        departmentId: this.departmentId,
        name: this.name,
        level: this.level,
        subtypeId: this.subtypeObject.id,
        originId: this.originId,
        dateStarted: this.dateStarted,
        middleYear: this.middleYear,
        knotYear: this.knotYear,
    };
};
