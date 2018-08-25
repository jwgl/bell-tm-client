import { Component } from '@angular/core';

import { ReissueForm } from '../shared/reissue-form.model';

@Component({
    templateUrl: 'approval-item.component.html',
})
export class ReissueApprovalItemComponent {
    form: ReissueForm;

    onItemLoaded(dto: any) {
        this.form = new ReissueForm(dto.form, dto.student);
    }
}
