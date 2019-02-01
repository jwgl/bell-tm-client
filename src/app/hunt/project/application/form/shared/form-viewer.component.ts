import { Component, Input } from '@angular/core';

import { FileTypes, ContentLabels } from '../../shared/constants';

const TitleType = ['项目申报', '年度检查验收', '中期检查验收', '结项检查验收'];
const ListItems = [{
    reportType: 1, label: '立项'
}, {
    reportType: 2, label: '年度'
}, {
    reportType: 3, label: '中期'
}, {
    reportType: 4, label: '结题'
}];

@Component({
    selector: 'tm-project-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class FormViewerComponent {
    @Input() vm: any;
    @Input() downloadUrl: string;
    @Input() isAdmin: boolean;
    // 临时记录当前选择的reportType，用于分别显示不同的阶段的评审详情
    reportType_: number;

    checkReportType() {
        if (!this.reportType_) {
            this.reportType_ = this.vm.reportType;
        }
    }
    conclusionClass(conclusion: string) {
        return conclusion === '通过' ? 'text-success' : 'text-danger';
    }

    getLabel(prefix: string): string {
        this.checkReportType();
        const fileTypes = FileTypes.find(f => f.reviewType === this.reportType_);
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
            return ListItems.filter(item => reportTypes.some((r: any) => r.reportType === item.reportType));
        } else {
            return null;
        }
    }

    get projectName(): string {
        this.checkReportType();
        if (this.reportType_ === 1) {
            return `${this.vm.name}-`;
        } else {
            return '';
        }
    }

    get projectCode(): string {
        this.checkReportType();
        if (this.reportType_ !== 1) {
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
        return this.reportType_ ? ContentLabels.content[this.reportType_] : '';
    }

    get furtherLabel(): string {
        this.checkReportType();
        return this.reportType_ ? ContentLabels.further[this.reportType_] : '';
    }

    get otherLabel(): string {
        this.checkReportType();
        return this.reportType_ ? ContentLabels.other[this.reportType_] : '';
    }

    get review(): any {
        this.checkReportType();
        const reviews = this.vm.relationReportTypes;
        if (reviews && reviews.length > 0) {
            return reviews.find((r: any) => r.reportType === this.reportType_);
        }
        return null;
    }

    getExt(fileName: string): string {
        return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    }

    typeSelected(reportType: number) {
        this.reportType_ = reportType;
    }
}
