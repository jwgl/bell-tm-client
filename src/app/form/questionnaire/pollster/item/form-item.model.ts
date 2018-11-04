import * as _ from 'lodash';

import { Questionnaire, Question } from '../../shared/questionnaire-form.model';
import { QuestionType } from '../../shared/question-type.model';
import { SurveyType, SURVEY_TYPE_MAP } from '../../shared/survey-type.model';

declare module '../../shared/questionnaire-form.model' {
    interface Questionnaire {
        validate(): string[];
    }

    interface Question {
        validate(): string;
    }
}

Questionnaire.prototype.validate = function (this: Questionnaire): string[] {
    if (this.surveyType !== SurveyType.ENTRY_FORM && this.questions.length === 0) {
        return [`${SURVEY_TYPE_MAP[this.surveyType]}未包含任何问题。`]
    } else {
        return this.questions.map(question => question.validate()).filter(it => !!it);
    }
};

Question.prototype.validate = function (this: Question): string {
    if ((this.type === QuestionType.SINGLE || this.type === QuestionType.MUTIPLE) && this.options.length < 2) {
        return `问题${this.ordinal + 1}的选项数不能小于2。`
    } else {
        return null;
    }
};
