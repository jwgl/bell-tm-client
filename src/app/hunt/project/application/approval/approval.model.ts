export class ConclusionForm {
    conclusionOfUniversity: string;
    opinionOfUniversity: string;
    conclusionOfProvince: string;
    opinionOfProvince: string;
    constructor(dto: any) {
        this.conclusionOfUniversity = dto.conclusionOfUniversity;
        this.opinionOfUniversity = dto.opinionOfUniversity;
        this.conclusionOfProvince = dto.conclusionOfProvince;
        this.opinionOfProvince = dto.opinionOfProvince;
    }
}
