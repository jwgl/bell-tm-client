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

    // get prevOffset(): number {
    //     let offset = this.offset - this.max;
    //     if (offset < 0) {
    //         offset = 0;
    //     }
    //     return offset;
    // }

    // get nextOffset(): number {
    //     let offset = this.offset + this.max;
    //     if (offset > this.total) {
    //         offset = this.total;
    //     }
    //     return offset;
    // }

    // get prevDisabled(): boolean {
    //     return this.offset === 0;
    // }

    // get nextDisabled(): boolean {
    //     return this.offset + this.items.length >= this.total;
    // }

    // get pagerEnabled(): boolean {
    //     return this.items.length < this.total;
    // }

    // get prevQueryParams() {
    //     if (this.query) {
    //         return {
    //             offset: this.prevOffset,
    //             query: this.query,
    //         };
    //     } else {
    //         return {
    //             offset: this.prevOffset,
    //         };
    //     }
    // }

    // get nextQueryParams() {
    //     if (this.query) {
    //         return {
    //             offset: this.nextOffset,
    //             max: this.max,
    //             query: this.query,
    //         };
    //     } else {
    //         return {
    //             offset: this.nextOffset,
    //             max: this.max,
    //         };
    //     }
    // }
}
