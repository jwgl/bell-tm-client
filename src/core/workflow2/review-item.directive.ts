import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[reviewItemformViewer]',
})
export class WorkflowReviewItemFormViewDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}

@Directive({
    selector: '[reviewItemTaskEditor]',
})
export class WorkflowReviewItemTaskEditorDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}
