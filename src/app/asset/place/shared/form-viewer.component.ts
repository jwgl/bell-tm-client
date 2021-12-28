import { Component, Input } from '@angular/core';

@Component({
    selector: 'tm-place-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class PlaceFormViewerComponent {
    @Input() vm: any;
    @Input() labelAdmin = false;
    @Input() userId: any;
    @Input() labels: any;

    common = true;
    labelAll() {
        this.common = false;
    }

    filterByBusiness(business: string) {
        return (label: any) => label.business === business;
    }

    filterByUserId() {
        return (label: any) => !label.single || label.userId === this.userId;
    }

    labelStr(label: any): string {
        return label ? `${label.type}：${label.labelName} ${label.single ? label.creator : ''}` : null;
    }

    toLabelStrings(ids: any): string {
        if (ids) {
            return this.labels.filter(item => ids.some(id => id === item.id))
                .map(label => label.labelName)
                .join(';');
        } else {
            return '';
        }
    }
}
