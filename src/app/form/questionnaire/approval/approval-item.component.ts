import { Component } from '@angular/core';

import { Questionnaire } from '../shared/questionnaire-form.model';

@Component({
    templateUrl: 'approval-item.component.html',
})
export class QuestionnaireApprovalItemComponent {
    form: Questionnaire;

    onItemLoaded(dto: any) {
        this.form = new Questionnaire(dto.form);
    }
}
