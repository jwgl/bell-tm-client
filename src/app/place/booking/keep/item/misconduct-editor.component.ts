import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';
import * as _ from 'lodash';

import { Misconduct } from './keep-item.model';
import { BookingKeepService } from '../booking-keep.service';

@Component({
    selector: 'tm-misconduct-editor',
    styleUrls: ['misconduct-editor.component.scss'],
    templateUrl: 'misconduct-editor.component.html',
})
export class MisconductEditorComponent implements OnInit {
    @Input()
    booking: any;

    @Input()
    misconduct: Misconduct;

    @Input()
    pictureUrl: string;

    @Input()
    startWeek: number;

    @Input()
    endWeek: number;

    @Input()
    mode: 'edit' | 'create';

    @Output()
    confirm = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    maxUploads = 10;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    options: UploaderOptions;
    _xsrfToken: string;

    types = ['聚众吃喝', '未使用', '到场人数不足', '其他'];
    weeks: number[];

    constructor(private service: BookingKeepService) {
        this.options = { concurrency: 3, maxUploads: this.maxUploads };
        this.files = [];
        this.uploadInput = new EventEmitter<UploadInput>();
        this.humanizeBytes = humanizeBytes;
        // 从cookie中截取XSRF-TOKEN
        const cookieAttributes: string[] = document.cookie.split(';');
        const csrf = cookieAttributes.filter((attr: string) => attr.includes('XSRF-TOKEN=')).toString();
        this._xsrfToken = csrf.replace('XSRF-TOKEN=', '');
    }

    ngOnInit(): void {
        let startWeek = this.booking.startWeek;
        switch (this.booking.oddEven) {
            case 1:
                if (startWeek % 2 === 0) {
                    startWeek++;
                }
                break;
            case 2:
                if (startWeek % 2 === 1) {
                    startWeek++;
                }
                break;
        }
        this.weeks = _.range(startWeek, this.booking.endWeek + 1, this.booking.oddEven === 0 ? 1 : 2);
        if (this.weeks.length === 1) {
            this.misconduct.week = this.weeks[0];
        }
    }

    onSubmit() {
        this.confirm.emit(this.misconduct);
    }

    onCancel() {
        this.cancel.emit(this.misconduct);
    }

    removePicture(picture: string) {
        const index = this.misconduct.pictures.indexOf(picture);
        this.misconduct.pictures.splice(index, 1);
    }

    onUploadOutput(output: UploadOutput): void {
        switch (output.type) {
            case 'allAddedToQueue':
                const event: UploadInput = {
                    type: 'uploadAll',
                    url: `/zuul${this.pictureUrl}`,
                    method: 'POST',
                    headers: { 'X-XSRF-TOKEN': this._xsrfToken },
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
                this.misconduct.pictures.push(output.file.response.file);
                break;
        }
    }
}
