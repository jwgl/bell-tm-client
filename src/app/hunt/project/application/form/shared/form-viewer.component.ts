import { Component, Input } from '@angular/core';

import { FileTypes } from '../../shared/constants';

@Component({
    selector: 'tm-project-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class FormViewerComponent {
    @Input() vm: any;

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

}
