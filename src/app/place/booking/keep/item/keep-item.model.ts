import * as _ from 'lodash';

export class Misconduct {
    id: number;
    type: string;
    content: string;
    pictures: string[];
    reporterId: string;
    reporterName: string;
    dateModified: string;
    week: number;
    userCount?: number;
    confirmation: number;
    editable: boolean;

    constructor(dto: any) {
        if (dto) {
            Object.assign(this, dto);
        } else {
            this.pictures = [];
        }
    }

    clone() {
        return new Misconduct(_.cloneDeep(this));
    }
}
