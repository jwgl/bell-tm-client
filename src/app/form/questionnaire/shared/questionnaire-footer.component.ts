import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Questionnaire } from './questionnaire-form.model';

@Component({
    selector: 'tm-questionnaire-footer',
    styleUrls: ['questionnaire-footer.component.scss'],
    templateUrl: 'questionnaire-footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionnaireFooterComponent {
    @Input()
    questionnaire: Questionnaire;
}
