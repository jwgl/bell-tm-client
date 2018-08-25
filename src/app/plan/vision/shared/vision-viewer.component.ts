import { Component, Inject, Input } from '@angular/core';

import { Vision } from './vision.model';

@Component({
    selector: 'tm-vision-viewer',
    styleUrls: ['vision-viewer.component.scss'],
    templateUrl: 'vision-viewer.component.html',
})
export class VisionViewerComponent {
    @Input() vision: Vision;

    constructor(@Inject('SCHEMES_PUBLIC_WEB_URL') private publicSchemesWebUrl: string) { }
}
