export interface ReviewInfo {
    taskId: string;
    formId: string;
    type: string;
    taskVariable: {
        name: string;
        values: string[];
    };
}

export class ReviewItem {
    reviewInfo: ReviewInfo;
    form: any;
}

export interface TaskVariable {
    name: string;
    values: string[];
};
