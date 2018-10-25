export interface QuestionnaireResponseStats {
    responseCount: number;
    questionStats: { [key: number]: QuestionResponseStats }
}

export interface QuestionResponseStats {
    response_count: number;
    question_option_stats: { [key: number]: number };
}
