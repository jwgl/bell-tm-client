export class ReviewList {
    type: string;
    total: number;
    page: number;
    size: number;
    items: any[];

    constructor(type: string, items: any[]) {
        this.type = type;
        this.items = items;
    }
}
