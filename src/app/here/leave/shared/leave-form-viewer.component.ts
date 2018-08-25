import {Component, Input} from '@angular/core';

@Component({
    selector: 'tm-leave-form-viewer',
    styleUrls: ['leave-form-viewer.component.scss'],
    templateUrl: 'leave-form-viewer.component.html',
})
export class LeaveFormViewerComponent {
    @Input() form: any;
}
