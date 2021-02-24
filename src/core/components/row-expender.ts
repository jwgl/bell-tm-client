import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';

import { Subject } from 'rxjs';

@Component({
    selector: 'tm-row-expender',
    templateUrl: 'row-expender.html',
    host: {
        'class.display': 'inline-block',
    },
})
export class RowExpenderComponent {
    @Input()
    enabled = false;

    @Input()
    expended = false;

    @Output()
    toggle = new EventEmitter<Subject<void>>();

    progressing = false;
    completed = new Subject<void>();

    constructor() {
        this.completed.subscribe(() => {
            if (this.progressing) {
                this.progressing = false;
                this.expended = true;
            }
        });
    }

    @HostListener('click')
    click(): void {
        if (!this.enabled) {
            return;
        }

        if (this.expended) {
            this.expended = false;
        } else {
            this.progressing = true;
            this.toggle.emit(this.completed);
        }
    }

    get icon(): string {
        return this.progressing ? 'spinner' : this.expended ? 'collapse' : 'expend';
    }
}
