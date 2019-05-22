import {Component, EventEmitter} from '@angular/core';

import { humanizeBytes, UploaderOptions, UploadFile, UploadInput, UploadOutput, UploadStatus } from 'ngx-uploader';

import { FundService } from './fund.service';

@Component({
    templateUrl: 'fund-list.component.html',
})
export class FundListComponent {
    funds: any[];

    xsrfToken: string;
    options: UploaderOptions;
    formData: FormData;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: (bytes: number) => string;
    maxUploads = 1;
    availableTypes = ['xls', 'xlsx'];

    constructor(private service: FundService) {
        this.files = []; // local uploading files array
        this.options = { concurrency: 3, maxUploads: this.maxUploads };
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = humanizeBytes;
        // 从cookie中截取XSRF-TOKEN
        const cookieAttributes: string[] = document.cookie.split(';');
        const csrf = cookieAttributes.filter((attr: string) => attr.includes('XSRF-TOKEN=')).toString();
        this.xsrfToken = csrf.replace('XSRF-TOKEN=', '');
    }

    onUploadOutput(output: UploadOutput): void {
        switch (output.type) {
            case 'allAddedToQueue':
                const event: UploadInput = {
                    type: 'uploadAll',
                    url: this.uploadUrl,
                    method: 'POST',
                    headers: { 'X-XSRF-TOKEN': this.xsrfToken },
                };
                this.uploadInput.emit(event);
                break;
            case 'addedToQueue':
                if (output.file) {
                    // 规定上传文件的格式
                    const type = output.file.name.slice(output.file.name.lastIndexOf('.') + 1).toLocaleLowerCase();
                    if (this.availableTypes.some(item => item === type)) {
                        alert(`请上传指定类型文件： ${this.availableTypes.join(' | ')}`);
                    } else {
                        this.files.push(output.file);
                    }
                }
                break;
            case 'uploading':
                if (output.file) {
                    const index = this.files.findIndex(file => file.id === output.file.id);
                    this.files[index] = output.file;
                }
                break;
            case 'removed':
                this.files = this.files.filter(file => file !== output.file);
                break;
            case 'rejected':
                alert(`最多上传${this.maxUploads}个文件。`);
                break;
            case 'done':
                this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);
                break;
        }
    }

    get uploadUrl(): string {
        return `${this.service.api.list()}/upload`;
    }
}
