export class ConclusionForm {
    conclusionOfUniversity: string;
    opinionOfUniversity: string;
    conclusionOfProvince: string;
    opinionOfProvince: string;
    code: string;
    dateStarted: string;
    middleYear: number;
    knotYear: number;
    constructor(dto: any) {
        this.conclusionOfUniversity = dto.conclusionOfUniversity;
        this.opinionOfUniversity = dto.opinionOfUniversity;
        this.conclusionOfProvince = dto.conclusionOfProvince;
        this.opinionOfProvince = dto.opinionOfProvince;
        this.code = dto.code;
        this.dateStarted = dto.dateStarted;
        this.middleYear = dto.middleYear;
        this.knotYear = dto.knotYear;
    }
}
