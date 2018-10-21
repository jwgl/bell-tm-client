import { Pipe } from '@angular/core';

import { SURVEY_TYPE_MAP } from './survey-type.model';

@Pipe({ name: 'surveyTypeText' })
export class SurveyTypeTextPipe {
    transform(surveyType: number) {
        return SURVEY_TYPE_MAP[surveyType];
    }
}
