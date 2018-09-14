import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

import { FileTypes } from '../shared/form.model';

@Component({
    template: `
    <modal-dialog [title]="title">
        <modal-body>
            <tm-uploader-panel [uploadUrl]="uploadUrl" [fileType]="fileType"></tm-uploader-panel>
        </modal-body>
        <modal-footer>
            <button type="button" class="btn btn-secondary" (click)="ok()">确定</button>
        </modal-footer>
    </modal-dialog>
    `,
})
// tslint:disable-next-line:component-class-suffix
export class UploaderDialog extends BaseDialog {
    uploadUrl: string;
    fileType: any;

    constructor() {
        super();
    }

    protected onOpening(): Observable<any> {
        this.uploadUrl = this.options.uploadUrl;
        this.fileType = FileTypes.filter(file => file.prefix === 'review')[0];
        return null;
    }

    protected onConfirmed(): any {
        return null;
    }

    get title(): string {
        return this.fileType.label;
    }
}
