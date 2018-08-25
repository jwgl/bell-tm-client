import { Component } from '@angular/core';

import { Vision } from '../shared/vision.model';

@Component({
    templateUrl: 'check-item.component.html',
})
export class VisionCheckItemComponent {
    form: Vision;

    onItemLoaded(dto: any) {
        this.form = new Vision(dto.form);
    }
}
