import { Component, EventEmitter, Input } from '@angular/core';
import { humanizeBytes, UploaderOptions, UploadFile, UploadInput, UploadOutput } from 'ngx-uploader';

import { FileType } from './uploader.model';

@Component({
    selector: 'tm-uploader-panel',
    styleUrls: ['uploader.component.scss'],
    templateUrl: 'uploader.component.html',
})
export class UploaderPanelComponent {
    @Input() uploadUrl: string;
    _xsrfToken: string;
    @Input() fileType: FileType;
    options: UploaderOptions;
    formData: FormData;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: (bytes: number) => string;
    dragOver: boolean;
    uploadAble = true;

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
        const e: UploadInput = {
            type: 'uploadAll',
            url: this.uploadUrl,
            method: 'POST',
            data: { prefix: this.fileType.prefix },
            headers: { 'X-XSRF-TOKEN': this._xsrfToken },
        };
        if (output.type === 'allAddedToQueue') {
            if (this.fileType.prefix !== 'photo' && this.uploadAble) {
                this.uploadInput.emit(e);
            }
        } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
            // 规定上传文件的格式
            const type = output.file.name.slice(output.file.name.lastIndexOf('.') + 1).toLocaleLowerCase();
            if (!this.fileType.types.some(item => item === type)) {
                alert(`请上传指定类型文件： ${this.fileType.types.join(' | ')}`);
                this.uploadAble = false;
            } else if (output.file.size > 10 * 1024 * 1024) {
                alert(`文件不应大于10MB`);
                this.uploadAble = false;
            } else if (this.fileType.prefix === 'photo') {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                        if (img.width !== 480 || img.height !== 640) {
                            alert('相片尺寸不符合要求！尺寸要求宽为480像素，高为640像素');
                        } else {
                            this.files.push(output.file);
                            this.uploadInput.emit(e);
                        }
                    };
                    img.src = (event.target as any).result;
                };
                reader.readAsDataURL(output.file.nativeFile);
            } else {
                this.files.push(output.file);
            }
        } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
            // update current data in files array for uploading file
            const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
            this.files[index] = output.file;
        } else if (output.type === 'removed') {
            // remove file from array when removed
            this.files = this.files.filter((file: UploadFile) => file !== output.file);
        } else if (output.type === 'dragOver') {
            this.dragOver = true;
        } else if (output.type === 'dragOut') {
            this.dragOver = false;
        } else if (output.type === 'drop') {
            this.dragOver = false;
        }
    }

    startUpload(): void {
        const event: UploadInput = {
            type: 'uploadAll',
            url: this.uploadUrl,
            method: 'POST',
            data: { prefix: this.fileType.prefix },
            headers: { 'X-XSRF-TOKEN': this._xsrfToken },
        };

        this.uploadInput.emit(event);
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
}
