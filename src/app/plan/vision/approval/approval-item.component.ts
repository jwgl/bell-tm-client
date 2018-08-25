import { Component } from '@angular/core';

import { Vision } from '../shared/vision.model';

@Component({
    templateUrl: 'approval-item.component.html',
})
export class VisionApprovalItemComponent {
    form: Vision;

    onItemLoaded(dto: any) {
        this.form = new Vision(dto.form);
    }
}
