import { Component, Input } from '@angular/core';

@Component({
    selector: 'tm-workflow-item-pager',
    templateUrl: 'item-pager.component.html',
})
export class WorkflowItemPagerComponent {
    @Input() prevId: any;
    @Input() nextId: any;
}
