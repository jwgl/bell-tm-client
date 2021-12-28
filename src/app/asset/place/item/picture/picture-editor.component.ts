import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, UploaderOptions, UploadStatus } from 'ngx-uploader';
@Component({
    selector: 'tm-picture-editor',
    styleUrls: ['picture-editor.component.scss'],
    templateUrl: 'picture-editor.component.html',
})
export class PictureEditorComponent {
    @Input()
    pictures: string[];

    @Input()
    pictureUrl: string;

    @Input()
    mode: 'edit' | 'create';

    @Output()
    confirm = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    maxUploads = 10;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    options: UploaderOptions;
    xsrfToken: string;

    constructor() {
        this.options = { concurrency: 3, maxUploads: this.maxUploads };
        this.files = [];
        this.uploadInput = new EventEmitter<UploadInput>();
        // 从cookie中截取XSRF-TOKEN
        const cookieAttributes: string[] = document.cookie.split(';');
        const csrf = cookieAttributes.filter((attr: string) => attr.includes('XSRF-TOKEN=')).toString();
        this.xsrfToken = csrf.replace('XSRF-TOKEN=', '');
    }

    onSubmit() {
        this.confirm.emit(this.pictures);
    }

    onCancel() {
        this.cancel.emit(this.pictures);
    }

    removePicture(picture: string) {
        const index = this.pictures.indexOf(picture);
        this.pictures.splice(index, 1);
    }

    onUploadOutput(output: UploadOutput): void {
        switch (output.type) {
            case 'allAddedToQueue':
                const event: UploadInput = {
                    type: 'uploadAll',
                    url: `/zuul${this.pictureUrl}`,
                    data: { prefix: 'place' },
                    method: 'POST',
                    headers: { 'X-XSRF-TOKEN': this.xsrfToken },
                };
                this.uploadInput.emit(event);
                break;
            case 'addedToQueue':
                if (output.file) {
                    this.files.push(output.file);
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
                alert(`最多上传${this.maxUploads}个图片。`);
                break;
            case 'done':
                this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);
                this.pictures.push(output.file.response.file);
                break;
        }
    }
}
