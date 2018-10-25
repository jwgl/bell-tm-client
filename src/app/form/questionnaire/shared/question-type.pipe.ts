import { Pipe } from '@angular/core';

import { QUESTION_TYPE_MAP } from './question-type.model';

@Pipe({ name: 'questionTypeText' })
export class QuestionTypeTextPipe {
    transform(questionType: number) {
        return QUESTION_TYPE_MAP[questionType];
    }
}
