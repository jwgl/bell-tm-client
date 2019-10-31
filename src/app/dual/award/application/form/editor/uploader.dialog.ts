import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

import { FileTypes } from '../../shared/form.model';

@Component({
    template: `
    <modal-dialog [modalTitle]="title">
        <modal-body>
            <div [markdown]="notice" [options]="{html:true}"></div>
            <tm-uploader-panel [uploadUrl]="uploadUrl" [fileType]="fileType"></tm-uploader-panel>
        </modal-body>
        <modal-footer>
            <button type="button" class="btn btn-secondary" (click)="ok()">确定</button>
        </modal-footer>
    </modal-dialog>
    `,
})
// tslint:disable-next-line:component-class-suffix
export class MaterialUploaderDialog extends BaseDialog {
    prefix: 'photo' | 'certi' | 'trans1' | 'trans2' | 'trans3';
    uploadUrl: string;
    fileType: any;
    notice: string;

    constructor() {
        super();
    }

    protected onOpening(): Observable<any> {
        this.prefix = this.options.prefix;
        this.uploadUrl = this.options.uploadUrl;
        this.notice = this.options.notice;
        this.fileType = FileTypes.filter(file => file.prefix === this.prefix)[0];
        return null;
    }

    protected onConfirmed(): any {
        return null;
    }

    get title(): string {
        return this.fileType.label;
    }
}
