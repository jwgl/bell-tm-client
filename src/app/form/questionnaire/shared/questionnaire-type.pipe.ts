import { Pipe } from '@angular/core';

import { QUESTIONNAIRE_TYPE_MAP } from './questionnaire-type.model';

@Pipe({ name: 'questionnaireTypeText' })
export class QuestionnaireTypeTextPipe {
    transform(questionnaireType: number) {
        return QUESTIONNAIRE_TYPE_MAP[questionnaireType];
    }
}
