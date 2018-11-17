import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'tm-misconduct-viewer',
    styleUrls: ['misconduct-viewer.component.scss'],
    templateUrl: 'misconduct-viewer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MisconductViewerComponent {
    @Input()
    misconduct: any;

    @Input()
    pictureUrl: string;
}
