import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Questionnaire } from './questionnaire-form.model';

@Component({
    selector: 'tm-respondent-address',
    templateUrl: 'respondent-address.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RespondentAddressComponent {
    @Input()
    questionnaire: Questionnaire;
}
