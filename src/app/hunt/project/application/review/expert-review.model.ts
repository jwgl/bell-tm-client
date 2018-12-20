import * as _ from 'lodash';

export class ExpertReview {
    id: number;
    name: string;
    principalName: string;
    level: string;
    subtype: string;
    date: Date;
    title: string;
    degree: string;
    departmentName: string;
    conclusion: string;
    dateReviewed: Date;

    constructor(dto: any) {
        this.id = dto.id;
        this.name = dto.name;
        this.principalName = dto.principalName;
        this.level = dto.level;
        this.subtype = dto.subtype;
        this.date = dto.date;
        this.title = dto.title;
        this.degree = dto.degree;
        this.departmentName = dto.departmentName;
        this.conclusion = dto.conclusion;
        this.dateReviewed = dto.dateReviewed;
    }

    get submitAble(): boolean {
        return !_.isNull(this.conclusion) && _.isNull(this.dateReviewed);
    }
}
