export class ConclusionForm {
    conclusionOfUniversity: string;
    opinionOfUniversity: string;
    conclusionOfProvince: string;
    opinionOfProvince: string;
    code: string;
    dateStarted: string;
    middleYear: number;
    knotYear: number;
    dateFinished: string;
    constructor(dto: any) {
        Object.assign(this, dto);
    }
}
