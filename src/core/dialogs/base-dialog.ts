import { EventEmitter, OnInit, Directive } from '@angular/core';
import { Observable } from 'rxjs';

export interface DynamicDialog {
    nativeElement: any;
    confirm: EventEmitter<any>;
    cancel: EventEmitter<void>;
    closed: EventEmitter<void>;
    options: any;
}

@Directive()
export class BaseDialog implements DynamicDialog, OnInit {
    nativeElement: any;
    $modal: JQuery;
    confirm: EventEmitter<any>;
    confirmed: boolean;
    closed: EventEmitter<void>;
    options: any;
    cancel: EventEmitter<void>;

    constructor() {
        this.confirm = new EventEmitter();
        this.cancel = new EventEmitter<void>();
        this.closed = new EventEmitter<void>();
    }

    ngOnInit() {
        this.$modal = $(this.nativeElement).find('.modal');

        this.$modal.on('show.bs.modal', () => {
            this.confirmed = false;
        }).on('hide.bs.modal', () => {
            if (this.confirmed) {
                this.confirm.emit(this.onConfirmed());
            } else {
                this.cancel.emit();
            }
        }).on('hidden.bs.modal', () => {
            this.closed.emit();
        });
        this.open();
    }

    ok() {
        this.confirmed = true;
        this.$modal.modal('hide');
    }

    open() {
        if (!this.options) {
            this.options = {};
        }
        const result = this.onOpening();
        if (result) {
            result.subscribe(value => {
                this.options.data = value;
                this.$modal.modal('show');
            }, error => {
                this.confirm.error(error);
            });
        } else {
            this.$modal.modal('show');
        }
    }

    close() {
        this.confirmed = false;
        this.$modal.modal('hide');
    }

    /**
     * 打开对话框时的初始化操作。
     */
    protected onOpening(): Observable<any> {
        return null;
    }

    /**
     * 如果希望对话框返回值，覆盖此方法。
     */
    protected onConfirmed(): any {
        return null;
    }
}
