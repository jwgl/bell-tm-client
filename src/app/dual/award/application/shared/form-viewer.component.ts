import { Component, Input } from '@angular/core';

import * as _ from 'lodash';
import * as dayjs from 'dayjs';

@Component({
    selector: 'tm-application-form-viewer',
    styleUrls: ['form-view-shared.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class ApplicationFormViewerComponent {
    @Input() vm: any;
    @Input() fileNames: any;
    @Input() paperForm: any;

    constructor() {
        dayjs.locale('zh-cn');
    }

    expired(date: string): boolean {
        return dayjs().isAfter(dayjs(date));
    }

    imgSrc(filename: string): string {
        return `/api/dual/picture?awardId=${this.vm.awardId}&studentId=${this.vm.studentId}&fileName=${filename ? filename : ''}`;
    }

    url(filename: string): string {
        return '/api/dual/picture/fileview?awardId=' + this.vm.awardId
            + '&studentId=' + this.vm.studentId + '&fileName=' + (filename ? filename : '');
    }

    open(filename: string) {
        if (!filename) {
            return;
        }
        window.open(this.url(filename), '文件浏览',
            'fullscreen=1, toolbar=0, menubar=0, location=0, status=0, scrollbars=1, resizable=0');
    }

    get sortedBakPaper(): string[] {
        return _.sortBy(this.fileNames.bak_paper);
    }

    bakPaperLabel(name: string): string {
        return '第' + name.slice(name.lastIndexOf('_') + 1, name.lastIndexOf('.')) + '稿';
    }

    get sortedBakReview(): string[] {
        return _.sortBy(this.fileNames.bak_review);
    }

    bakReviewLabel(name: string): string {
        return '第' + name.slice(name.lastIndexOf('_') + 1, name.lastIndexOf('.')) + '次批阅';
    }

    download(filename: string): string {
        return '/api/dual/picture/download?awardId=' + this.vm.awardId
            + '&studentId=' + this.vm.studentId + '&fileName=' + (filename ? filename : '');
    }
}
