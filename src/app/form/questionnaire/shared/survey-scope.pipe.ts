import { Pipe } from '@angular/core';
import { SURVEY_SCOPE_MAP } from './survey-scope.model';

@Pipe({ name: 'surveyScopeText' })
export class SurveyScopeTextPipe {
    transform(surveyScope: number) {
        return SURVEY_SCOPE_MAP[surveyScope];
    }
}
