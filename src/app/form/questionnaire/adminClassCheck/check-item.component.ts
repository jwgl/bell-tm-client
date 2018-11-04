import { Component } from '@angular/core';

import { Questionnaire } from '../shared/questionnaire-form.model';

@Component({
    templateUrl: 'check-item.component.html',
})
export class QuestionnaireCheckItemComponent {
    form: Questionnaire;

    onItemLoaded(dto: any) {
        this.form = new Questionnaire(dto.form);
    }
}
