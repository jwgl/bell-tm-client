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

    common = true;
    labelAll() {
        console.log(this.userId);
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
}
