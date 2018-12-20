import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';

import { AdministrationService } from './administration.service';
import { Review } from './review.model';

@Component({
    styleUrls: ['project-list.component.scss'],
    templateUrl: 'project-list.component.html',
})
export class ProjectListComponent {
    list: Review[];

    taskId: number;
    type: string;
    isCheckTime = false;
    existExpertReview = false;

    options = [
        { label: '年度', type: 2, count: 0 },
        { label: '中期', type: 3, count: 0 },
        { label: '结题', type: 4, count: 0 },
    ];

    constructor(
        private service: AdministrationService,
        private route: ActivatedRoute,
    ) {
        this.route.params.subscribe(params => {
            this.taskId = params['taskId'];
            this.type = params['type'];
            this.loadData();
        }
        );
    }

    get cols(): number {
        return this.existExpertReview ? 12 : 9;
    }

    loadData() {
        this.service.loadProjects(this.taskId, {
            reportType: this.type,
        }).subscribe((dto: any) => {
            this.list = dto.list ? dto.list.map(r => new Review(r)) : null;
            this.isCheckTime = dto.isCheckTime;
            this.existExpertReview = dto.existExpertReview;
            const counts = dto.counts;
            this.options.forEach(item => {
                const count = counts.find(c => c.reportType === item.type);
                if (count) {
                    item.count = count.value;
                }
            });
        });
    }

    toggle(subject: Subject<void>, review: Review): void {
        if (review.expertReview) {
            subject.next();
        } else {
            this.service.loadExpertReview(this.taskId, review.id).subscribe(dto => {
                review.expertReview = dto;
                subject.next();
            });
        }
    }
}
