import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'tm-link-pager',
    templateUrl: 'link-pager.html',
})
export class LinkPagerComponent {
    @Input() total: number;
    @Input() page: number = 0;
    @Input() size: number = 10;
    @Input() extra: any;

    constructor() {
        this.page = 0;
    }

    get maxPage() {
        return this.total / this.size;
    }

    get prevLink() {
        return this.extra
            ? [{ page: this.page - 1, ...this.extra }]
            : [{ page: this.page - 1 }];
    }

    get nextLink() {
        return this.extra
            ? [{ page: this.page + 1, ...this.extra }]
            : [{ page: this.page + 1 }];
    }
}
