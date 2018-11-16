import * as _ from 'lodash';

export class Misconduct {
    id: number;
    type: string;
    content: string;
    pictures: string[];
    reporterId: string;
    reporterName: string;
    dateReported: string;
    week: number;
    userCount?: number;
    confirmation: number;

    constructor(dto: any) {
        if (dto) {
            Object.assign(this, dto);
        } else {
            this.pictures = [];
        }
    }

    clone() {
        const x = new Misconduct(_.cloneDeep(this));
        console.log("clone:" + (x.pictures === this.pictures))
        return x;
    }
}
