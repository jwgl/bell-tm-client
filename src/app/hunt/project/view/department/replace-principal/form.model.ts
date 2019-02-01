import { ChangeForm } from '../../../info-change/form/shared/form.model';

declare module '../../../info-change/form/shared/form.model' {
    interface ChangeForm {
        toServerDto(): any;
    }
}

ChangeForm.prototype.toServerDto = function (this: ChangeForm): any {
    return {
        projectId: this.projectId,
        principalId: this.principalId,
        title: this.title,
        degree: this.degree,
        email: this.email,
        office: this.office,
        phone: this.phone,
        mainInfoForm: this.mainInfoForm,
        type: [1],
        reason: this.reason,
        name: this.name,
    };
};
