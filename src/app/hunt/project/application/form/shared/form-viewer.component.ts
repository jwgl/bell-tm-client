import { Component, Input } from '@angular/core';

import * as _ from 'lodash';

import { FileTypes, ContentLabels } from '../../shared/constants';

const TitleType = ['项目申报', '年度检查验收', '中期检查验收', '结项检查验收'];
const ReportLabels = { 1: '立项', 2: '年度', 3: '中期', 4: '结题' };

@Component({
    selector: 'tm-project-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class FormViewerComponent {
    @Input() vm: any;
    @Input() isAdmin: boolean;
    // 临时记录当前选择的reportType，用于分别显示不同的阶段的评审详情
    reportType: number;
    reviewId: number;

    checkReportType() {
        if (!this.reviewId) {
            this.reportType = this.vm.reportType;
            this.reviewId = this.vm.id;
        }
    }
    conclusionClass(conclusion: string) {
        return conclusion === '通过' ? 'text-success' : 'text-danger';
    }

    getLabel(prefix: string): string {
        this.checkReportType();
        const fileTypes = FileTypes.find(f => f.reviewType === this.reportType);
        if (fileTypes) {
            const fileType = fileTypes.fileType;
            const item = fileType.find(i => i.prefix === prefix);
            return item ? item.label : '未知文件';
        } else {
            return '未知文件';
        }
    }

    get listItems(): any {
        const reportTypes = this.vm.relationReportTypes;
        if (reportTypes && reportTypes.length > 0) {
            this.checkReportType();
            return this.vm.relationReportTypes.map((item: any) =>
                ({ reviewId: item.id, reportType: item.reportType, label: ReportLabels[item.reportType] }));
        } else {
            return null;
        }
    }

    get projectName(): string {
        this.checkReportType();
        if (this.reportType === 1) {
            return `${this.vm.name}-`;
        } else {
            return '';
        }
    }

    get projectCode(): string {
        this.checkReportType();
        if (this.reportType !== 1) {
            return `${this.vm.code}-`;
        } else {
            return '';
        }
    }

    get title(): string {
        if (!this.vm.reportType) {
            return `项目#${this.vm.projectId}`;
        } else {
            return `${TitleType[this.vm.reportType - 1]} #${this.vm.id}`;
        }
    }

    get contentLabel(): string {
        this.checkReportType();
        return this.reportType ? ContentLabels.content[this.reportType] : '';
    }

    get furtherLabel(): string {
        this.checkReportType();
        return this.reportType ? ContentLabels.further[this.reportType] : '';
    }

    get otherLabel(): string {
        this.checkReportType();
        return this.reportType ? ContentLabels.other[this.reportType] : '';
    }

    get review(): any {
        this.checkReportType();
        const reviews = this.vm.relationReportTypes;
        if (reviews && reviews.length > 0) {
            return reviews.find((r: any) => r.id === this.reviewId);
        }
        return null;
    }

    get downloadUrl_(): string {
        return `/api/hunt/attachments/${this.review ? this.review.id : ''}?type=REVIEW`;
    }

    getExt(fileName: string): string {
        return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    }

    typeSelected(reviewId: number) {
        this.reviewId = reviewId;
    }

    get expertDone(): any[] {
        return _.filter(this.vm.expertReview, (item: any) => item.dateReviewed);
    }

    get expertTodo(): any[] {
        return _.filter(this.vm.expertReview, (item: any) => item.dateReviewed === null);
    }
}
