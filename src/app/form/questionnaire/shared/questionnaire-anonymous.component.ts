import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Questionnaire } from './questionnaire-form.model';

@Component({
    selector: 'tm-questionnaire-anonymous',
    templateUrl: 'questionnaire-anonymous.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionnaireAnonymouseComponent {
    @Input()
    questionnaire: Questionnaire;
}
