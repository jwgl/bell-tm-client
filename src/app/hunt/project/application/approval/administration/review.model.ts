export class Review {
    id: number;
    name: string;
    code: string;
    level: string;
    subtype: string;
    departmentName: string;
    principalName: string;
    status: string;
    countOk: number;
    countVeto: number;
    countWaiver: number;
    countNull: number;
    average: number;
    totalScore: number;
    departmentOpinion: string;
    expertReview: any;
    conclusion: string;
    opinionOfUniversity: string;
    opinionOfProvince: string;
    conclusionOfUniversity: string;

    constructor(dto: any) {
        Object.assign(this, dto);
    }
}
