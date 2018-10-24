export class Type {
    id: number;
    parentId: number;
    parentName: string;
    name: string;
    periodOfUniversity: number;
    periodOfCity: number;
    periodOfProvince: number;
    periodOfNation: number;
    enabled: boolean;

    constructor(dto: any) {
        this.id = dto.id;
        this.parentId = dto.parentId;
        this.parentName = dto.parentName;
        this.name = dto.name;
        this.periodOfUniversity = dto.periodOfUniversity;
        this.periodOfCity = dto.periodOfCity;
        this.periodOfProvince = dto.periodOfProvince;
        this.periodOfNation = dto.periodOfNation;
        this.enabled = dto.enabled;
    }

    toServerDto(): any {
        return {
            id: this.id,
            parentId: this.parentId,
            parentName: this.parentName,
            periodOfUniversity: this.periodOfUniversity,
            periodOfCity: this.periodOfCity,
            periodOfProvince: this.periodOfProvince,
            periodOfNation: this.periodOfNation,
            name: this.name,
            enabled: this.enabled,
        };
    }
}
