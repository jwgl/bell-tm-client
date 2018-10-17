import { Pipe } from '@angular/core';

import { RESPONDENT_TYPE_MAP } from './respondent-type.model';

@Pipe({ name: 'respondentTypeText' })
export class RespondentTypeTextPipe {
    transform(respondentType: number) {
        return RESPONDENT_TYPE_MAP[respondentType];
    }
}
