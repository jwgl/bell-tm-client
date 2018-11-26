import * as _ from 'lodash';

import { ProjectForm } from '../shared/form.model';

declare module '../shared/form.model' {
    interface ProjectForm {
        toServerDto(): any;
    }
}

ProjectForm.prototype.toServerDto = function(this: ProjectForm): any {
    return {
        reviewTaskId: this.reviewTaskId,
        principalId: this.principalId,
        title: this.title,
        degree: this.degree,
        email: this.email,
        discipline: this.discipline,
        direction: this.direction,
        departmentId: this.departmentId,
        office: this.office,
        phone: this.phone,
        name: this.name,
        urls: this.urls,
        level: this.level,
        major: this.major,
        subtypeId: this.subtypeId,
        originId: this.originId,
        members: _.chain(this.memberList).map(data => data.value).filter(v => v !== '').join(';').value(),
        content: this.content,
        achievements: this.achievements,
        mainInfoForm: this.mainInfoForm,
        proofFile: this.proofFile,
        summaryReport: this.summaryReport,
    };
};
