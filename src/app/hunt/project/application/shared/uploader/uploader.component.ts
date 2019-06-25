import { Component, EventEmitter, Input } from '@angular/core';
import { humanizeBytes, UploaderOptions, UploadFile, UploadInput, UploadOutput, UploadStatus } from 'ngx-uploader';

import { FileType } from './uploader.model';

@Component({
    selector: 'tm-uploader-panel',
    styleUrls: ['uploader.component.scss'],
    templateUrl: 'uploader.component.html',
})
export class UploaderPanelComponent {
    @Input()
    uploadUrl: string;
    @Input()
    fileType: FileType;
    @Input()
    options = { concurrency: 3, maxUploads: 1 };
    // @Output()
    // uploaded = new EventEmitter();

    _xsrfToken: string;
    formData: FormData;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: (bytes: number) => string;
    dragOver: boolean;
    uploadAble = true;
    fileName: any;

    constructor() {
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = humanizeBytes;
        // 从cookie中截取XSRF-TOKEN
        const cookieAttributes: string[] = document.cookie.split(';');
        const csrf = cookieAttributes.filter((attr: string) => attr.includes('XSRF-TOKEN=')).toString();
        this._xsrfToken = csrf.replace('XSRF-TOKEN=', '');
    }

    // 选择文件后触发的顺序是addedToQueue > allAddedToQueue > uploading
    // 上传的文件不依赖this.files, 就是清空了也不影响上传
    onUploadOutput(output: UploadOutput): void {
        if (this.options.maxUploads <= 0) {
            if (output.type === 'addedToQueue' || output.type === 'rejected') {
                alert('上传文件数量已达最大值！');
            }
            return;
        }
        switch (output.type) {
            case 'allAddedToQueue':
                if (this.uploadAble) {
                    const event: UploadInput = {
                        type: 'uploadAll',
                        url: this.uploadUrl,
                        method: 'POST',
                        data: { prefix: this.fileType.prefix },
                        headers: { 'X-XSRF-TOKEN': this._xsrfToken },
                    };
                    this.uploadInput.emit(event);
                }
                break;
            case 'addedToQueue':
                if (output.file) {
                    // 规定上传文件的格式
                    const type = output.file.name.slice(output.file.name.lastIndexOf('.') + 1).toLocaleLowerCase();
                    if (!this.fileType.types.some(item => item === type)) {
                        alert(`请上传指定类型文件： ${this.fileType.types.join(' | ')}`);
                        this.uploadAble = false;
                    } else if (output.file.size > 20 * 1024 * 1024) {
                        alert(`文件不应大于20MB`);
                        this.uploadAble = false;
                    } else {
                        this.uploadAble = true;
                        this.files.push(output.file);
                    }
                }
                break;
            case 'uploading':
                if (output.file) {
                    const index1 = this.files.findIndex(file => file.id === output.file.id);
                    this.files[index1] = output.file;
                }
                break;
            case 'removed':
                this.files = this.files.filter(file => file !== output.file);
                const index = this.fileType.names.indexOf(output.file.name);
                this.fileType.names.splice(index, 1);
                break;
            case 'rejected':
                alert(`最多上传${this.options.maxUploads}个文件。`);
                break;
            case 'done':
                this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);
                this.fileType.names.push(output.file.response.file);
                break;
        }
    }

    cancelUpload(itemid: string): void {
        this.uploadInput.emit({ type: 'cancel', id: itemid });
    }

    removeFile(itemid: string): void {
        this.uploadInput.emit({ type: 'remove', id: itemid });
    }

    removeAllFilesFiles(): void {
        this.uploadInput.emit({ type: 'removeAll' });
    }

    getFileNames(): string {
        if (this.files.length === 0) {
            return '未选择任何文件';
        } else {
            return this.files.map(file => file.name).join(',');
        }
    }

    remove(name: string) {
        const index = this.fileType.names.indexOf(name);
        this.fileType.names.splice(index, 1);
        this.files.pop();
    }
}
