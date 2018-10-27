import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BaseDialog } from 'core/dialogs';
import { StringStringOption } from 'core/options';

import { QuestionnaireFormService } from '../../questionnaire-form.service';
import { SURVEY_TYPES } from '../../../shared/survey-type.model';
import { SURVEY_SCOPES } from '../../../shared/survey-scope.model';
import { RESPONDENT_TYPES } from '../../../shared/respondent-type.model';

@Component({
    templateUrl: 'create-option.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class CreateOptionDialog extends BaseDialog {
    surveyTypes: StringStringOption[];
    surveyScopes: StringStringOption[];
    respondentTypes: StringStringOption[];
    result: {
        surveyType: string;
        surveyScope: string;
        respondentType: string;
    }

    constructor(private service: QuestionnaireFormService) {
        super();
    }

    protected onOpening(): Observable<any> {
        this.result = {
            surveyType: 'QUESTIONNAIRE',
            surveyScope: 'DEPARTMENT',
            respondentType: 'STUDENT',
        };

        return this.service.loadCreateOptions().pipe(
            tap(result => {
                this.surveyTypes = SURVEY_TYPES.filter(it => result.surveyTypes.includes(it.value));
                this.surveyScopes = SURVEY_SCOPES.filter(it => result.surveyScopes.includes(it.value));
                this.respondentTypes = RESPONDENT_TYPES.filter(it => result.respondentTypes.includes(it.value));
            })
        );
    }

    protected onConfirmed(): any {
        return this.result;
    }
}
