import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'tm-pager',
    templateUrl: 'pager.html',
})
export class PagerComponent {
    @Input() total: number;
    @Input() offset: number;
    @Input() length: number;
    @Input() max: number;
    @Output() next = new EventEmitter(false);
    @Output() prev = new EventEmitter(false);

    constructor() {
        this.offset = 0;
    }

    onPrev() {
        this.offset -= this.max;
        if (this.offset < 0) {
            this.offset = 0;
        }
        this.prev.emit(this.offset);
    }

    onNext() {
        this.offset += this.max;
        if (this.offset > this.total) {
            this.offset = this.total;
        }
        this.next.emit(this.offset);
    }
}
