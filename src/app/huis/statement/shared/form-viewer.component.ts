import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'tm-statement-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class StatementFormViewerComponent {
    @Input() form: any;
    @ContentChild('workflowTpl') workflowTemplate: TemplateRef<any>;
}
