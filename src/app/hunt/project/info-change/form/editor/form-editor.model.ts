import * as _ from 'lodash';

import { ChangeForm } from '../shared/form.model';

declare module '../shared/form.model' {
    interface ChangeForm {
        toServerDto(): any;
        checkMembers(): boolean;
    }
}

ChangeForm.prototype.toServerDto = function(this: ChangeForm): any {
    this.mainInfoForm = this.fileType.names.length > 0 ? this.fileType.names[0] : null;
    const members = this.type.some(t => t === 7) ?
        _.chain(this.memberList).map(data => data.value).filter(v => v !== '').join(';').value() : null;
    return {
        projectId: this.projectId,
        type: this.type,
        principalId: this.principalId,
        middleYear: this.middleYear,
        knotYear: this.knotYear,
        name: this.name,
        members,
        content: this.content,
        achievements: this.achievements,
        mainInfoForm: this.mainInfoForm,
        other: this.other,
        reason: this.reason,
    };
};

ChangeForm.prototype.checkMembers = function(this: ChangeForm): any {
    const members = _.chain(this.memberList).map(data => data.value).filter(v => v !== '').join(';').value();
    return _.isNull(members) || _.isUndefined(members) || _.isEmpty(members);
};
