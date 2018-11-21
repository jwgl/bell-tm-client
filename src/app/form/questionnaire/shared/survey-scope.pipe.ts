import { Pipe, PipeTransform } from '@angular/core';

import { SURVEY_SCOPE_MAP } from './survey-scope.model';

@Pipe({ name: 'surveyScopeText' })
export class SurveyScopeTextPipe implements PipeTransform {
    transform(surveyScope: string) {
        return SURVEY_SCOPE_MAP[surveyScope];
    }
}
