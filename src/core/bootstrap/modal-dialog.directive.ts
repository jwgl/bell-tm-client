import { Component, Directive, Input } from '@angular/core';

@Component({
    selector: 'modal-dialog',
    template: `
    <div class="modal fade" tabindex="-1">
        <div class="modal-dialog" [ngClass]="{'modal-lg': size == 'lg', 'modal-sm': size == 'sm'}">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modalTitle">{{title}}</h5>
                    <button type="button" class="close" data-dismiss="modal" *ngIf="closable"><span>&times;</span></button>
                </div>
                <ng-content select="modal-body"></ng-content>
                <ng-content select="modal-footer"></ng-content>
            </div>
        </div>
    </div>
    `,
})
export class ModalDialogComponent {
    @Input('modalTitle')
    title: string;

    @Input()
    size: string;

    @Input()
    closable = true;
}

/* tslint:disable:max-classes-per-file */
/**
 * <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
 */
@Directive({
    selector: 'modal-dialog button[modalCancel]',
    host: {
        '[attr.type]': '"button"',
        '[class.btn]': 'true',
        '[class.btn-secondary]': 'true',
        '[attr.data-dismiss]': '"modal"',
    },
})
export class ModalCancelButtonDirective { }

/**
 * <button type="button" class="btn btn-primary" (click)="ok()">确定</button>
 */
@Directive({
    selector: 'modal-dialog button[modalOk]',
    host: {
        '[attr.type]': "'button'",
        '[class.btn]': 'true',
        '[class.btn-primary]': 'true',
    },
})
export class ModalOkButtonDirective { }

@Directive({
    selector: 'modal-body',
    host: { '[class]': '"modal-body"' },
})
export class ModalBodyDirective { }

@Directive({
    selector: 'modal-footer',
    host: { '[class]': 'footerClass' },
})
export class ModalFooterDirective {
    // IE bug, when justify-content: flex-end, margin: auto does not work
    @Input() fix: boolean;

    get footerClass(): string {
        return this.fix ? 'modal-footer justify-content-start' : 'modal-footer';
    }
}
