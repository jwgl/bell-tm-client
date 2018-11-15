import { Component, Input } from '@angular/core';

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
}
