import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Questionnaire } from './questionnaire-form.model';

@Component({
    selector: 'tm-questionnaire-respondents',
    templateUrl: 'questionnaire-respondents.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionnaireRespondentsComponent {
    @Input()
    questionnaire: Questionnaire;
}
