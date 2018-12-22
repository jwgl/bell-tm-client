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

    conclusionClass(conclusion: string) {
        return conclusion === '通过' ? 'text-success' : 'text-danger';
    }

    getLabel(prefix: string): string {
        const fileTypes = FileTypes.find(f => f.reviewType === this.vm.reportType);
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
            return ListItems.filter(item => reportTypes.some((r: any) => r.reportType === item.reportType));
        } else {
            return null;
        }
    }

    get projectName(): string {
        if (this.vm.reportType === 1) {
            return `${this.vm.name}-`;
        } else {
            return '';
        }
    }

    get projectCode(): string {
        if (this.vm.reportType !== 1) {
            return `${this.vm.code}-`;
        } else {
            return '';
        }
    }

    get title(): string {
        return `${TitleType[this.vm.reportType - 1]} #${this.vm.id}`;
    }

    get contentLabel(): string {
        return this.vm.reportType ? ContentLabels.content[this.vm.reportType] : '';
    }

    get furtherLabel(): string {
        return this.vm.reportType ? ContentLabels.further[this.vm.reportType] : '';
    }

    get otherLabel(): string {
        return this.vm.reportType ? ContentLabels.other[this.vm.reportType] : '';
    }

    get review(): any {
        const reviews = this.vm.relationReportTypes;
        if (reviews && reviews.length > 0) {
            return reviews.find((r: any) => r.reportType === this.vm.reportType);
        }
        return null;
    }

    getExt(fileName: string): string {
        return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    }

    typeSelected(reportType: number) {
        this.vm.reportType = reportType;
    }
}
