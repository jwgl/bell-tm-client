export class UniversityForm {
    id: number;
    nameCn: string;
    regionId: number;
    regionName: string;
    nameEn: string;
    shortName: string;
    items: Major[];

    constructor(dto: any) {
        this.id = dto.id;
        this.nameCn = dto.nameCn;
        this.regionId = dto.regionId;
        this.regionName = dto.region;
        this.nameEn = dto.nameEn;
        this.shortName = dto.shortName;
        this.items = dto.items.map((itemDto: any) => new Major(this, itemDto));
    }
}

/* tslint:disable:max-classes-per-file */
export class Major {
    form: UniversityForm;
    id: number;
    nameEn: string;
    shortName: string;
    nameCn: string;
    bachelor: string;

    constructor(form: UniversityForm, dto: any) {
        this.form = form;
        this.id = dto.id;
        this.nameEn = dto.nameEn;
        this.shortName = dto.shortName;
        this.nameCn = dto.nameCn;
        this.bachelor = dto.bachelor;
    }

    equalsTo(other: Major): boolean {
        if (this.id && other.id && this.id === other.id) {
            return true;
        }
        return false;
    }
}
