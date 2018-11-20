import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';

import { Subject } from 'rxjs';

@Component({
    selector: 'tm-row-expender',
    template: '<fa-icon *ngIf="enabled" fixedWidth="true" size="1" [icon]="icon" [spin]="progressing"></fa-icon>',
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

    get icon(): string[] {
        return this.progressing
                ? ['fas', 'spinner']
                : this.expended
                    ? ['far', 'minus-square']
                    : ['far', 'plus-square'];
    }
}
