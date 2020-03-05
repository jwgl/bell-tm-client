import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { Dialog } from 'core/dialogs';
import { CommonDialog } from 'core/common-dialogs';

import { ReviewService } from '../review.service';
import { ProjectForm } from '../../form/shared/form.model';
import { ReviewDialog } from '../list/review.dialog';

@Component({
    templateUrl: 'item.component.html',
})
export class ReviewItemComponent {
    vm: ProjectForm;
    saving = false;
    editAble = false;
    reviewInfo: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ReviewService,
        private dialogs: CommonDialog,
        private dialog: Dialog,
    ) {
        const params = this.route.snapshot.params;
        this.loadData(params['applicationId']);
    }

    loadData(id: number) {
        this.service.loadItem(id).subscribe((dto: any) => {
            this.vm = new ProjectForm(dto.form);
            this.editAble = dto.editAble;
            this.reviewInfo = {
                remind: dto.remind,
                name: dto.name,
                departmentOpinion: dto.departmentOpinion,
                departmentConclusion: dto.departmentConclusion,
                conclusion: dto.conclusion,
                editAble: dto.editAble,
                opinion: dto.opinion,
                score: dto.score,
            };
        });
    }

    review() {
        this.dialog.open(ReviewDialog, { reviewInfo: this.reviewInfo }).then(result =>
            this.service.update(this.vm.id, result).subscribe(() => this.editAble = false)
        );
    }

}
