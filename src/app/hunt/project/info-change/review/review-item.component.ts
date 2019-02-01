import { Component } from '@angular/core';

import { ChangeForm } from '../form/shared/form.model';
import { ReviewService } from './review.service';
@Component({
    templateUrl: 'review-item.component.html',
})
export class InfoChangeReviewItemComponent {
    form: ChangeForm;
    project: any;

    constructor(private service: ReviewService) { }

    onItemLoaded(dto: any) {
        this.form = new ChangeForm(dto.form);
        this.project = dto.project;
    }

    get downloadUrl(): string {
        return this.service.getDownloadUrl(this.form.id);
    }
}
