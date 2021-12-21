import { Component, Input } from '@angular/core';

@Component({
    selector: 'tm-plan-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class PlanViewerComponent {
    @Input() vm: any;
    @Input() labels: any;

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
