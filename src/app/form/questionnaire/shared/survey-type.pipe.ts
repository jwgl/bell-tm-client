import { Pipe } from '@angular/core';

import { SURVEY_TYPE_MAP, SURVEY_TYPE_ALT_MAP } from './survey-type.model';

@Pipe({ name: 'surveyTypeText' })
export class SurveyTypeTextPipe {
    transform(surveyType: number, alt = false) {
        if (alt) {
            return SURVEY_TYPE_ALT_MAP[surveyType];
        } else {
            return SURVEY_TYPE_MAP[surveyType];
        }
    }
}
