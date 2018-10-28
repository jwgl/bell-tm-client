import { Questionnaire, Question, QuestionOption } from '../../shared/questionnaire-form.model';
import { QuestionType } from '../../shared/question-type.model';
import { QuestionnaireResponseStats, QuestionResponseStats } from '../../shared/questionnaire-response-stats.model';

declare module '../../shared/questionnaire-form.model' {
    interface Questionnaire {
        responseCount: number;
        initStats(stats: QuestionnaireResponseStats): void;
    }

    interface Question {
        responseCount: number;
        openResponseCount: number; // 多选未展开
        openResponses: { value: string, count: number }[];
        openResponseTotalCount: number; // 多选展开
        __scaleCounts: { [key: number]: number };
        getScaleCount(scale: number): number;
        initStats(stats: QuestionResponseStats): void;
    }

    interface QuestionOption {
        responseCount: number;
    }
}

Questionnaire.prototype.initStats = function (this: Questionnaire, stats: QuestionnaireResponseStats): void {
    this.responseCount = stats.responseCount;
    this.questions.forEach(question => {
        const questionStats = stats.questionStats[question.id];
        if (questionStats) {
            question.initStats(questionStats);
        } else {
            question.responseCount = 0;
        }
    });
};

Question.prototype.initStats = function (this: Question, stats: QuestionResponseStats): void {
    this.responseCount = stats.response_count;
    switch (this.type) {
        case QuestionType.TEXT:
            break;
        case QuestionType.SINGLE:
        case QuestionType.MUTIPLE:
            this.options.forEach(option => {
                const responseCount = stats.question_option_stats[option.id];
                option.responseCount = responseCount ? responseCount : 0;
            });
            if (this.openEnded) {
                this.openResponseCount = stats.question_option_stats[0];
            }
            break;
        case QuestionType.SCALE:
            this.__scaleCounts = stats.question_option_stats;
            break;
    }
};

Question.prototype.getScaleCount = function (this: Question, scale: number): number {
    if (this.type === QuestionType.SCALE) {
        const count = this.__scaleCounts[scale];
        return count ? count : 0;
    } else {
        return 0;
    }
};
