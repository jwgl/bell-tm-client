import { Pipe } from '@angular/core';

import { RESPONDENT_TYPE_MAP, RESPONDENT_TYPE_ALT_MAP } from './respondent-type.model';

@Pipe({ name: 'respondentTypeText' })
export class RespondentTypeTextPipe {
    transform(respondentType: number, alt = false) {
        if (alt) {
            return RESPONDENT_TYPE_ALT_MAP[respondentType];
        } else {
            return RESPONDENT_TYPE_MAP[respondentType];
        }
    }
}
