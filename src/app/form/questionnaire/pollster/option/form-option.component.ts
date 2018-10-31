import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StringStringOption } from 'core/options';
import { SURVEY_TYPES } from '../../shared/survey-type.model';
import { SURVEY_SCOPES } from '../../shared/survey-scope.model';
import { RESPONDENT_TYPES } from '../../shared/respondent-type.model';
import { QuestionnaireFormService } from '../questionnaire-form.service';

@Component({
    styleUrls: ['form-option.component.scss'],
    templateUrl: 'form-option.component.html',
})
export class QuestionnaireFormOptionComponent {
    surveyTypes: StringStringOption[];
    surveyScopes: StringStringOption[];
    respondentTypes: StringStringOption[];
    options = {
        surveyType: 'QUESTIONNAIRE',
        surveyScope: 'DEPARTMENT',
        respondentType: 'STUDENT',
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: QuestionnaireFormService,
    ) {
        this.service.loadCreateOptions().subscribe(result => {
            this.surveyTypes = SURVEY_TYPES.filter(it => result.surveyTypes.includes(it.value));
            this.surveyScopes = SURVEY_SCOPES.filter(it => result.surveyScopes.includes(it.value));
            this.respondentTypes = RESPONDENT_TYPES.filter(it => result.respondentTypes.includes(it.value));
        });
    }

    onCreate() {
        this.router.navigate(['../create', this.options], { relativeTo: this.route });
    }
}
