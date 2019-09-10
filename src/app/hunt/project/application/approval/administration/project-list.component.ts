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

    ths = [
        {id: 'name', label: '项目名称', order: true},
        {id: 'code', label: '项目编号', order: true},
        {id: 'level', label: '等级', filter: true},
        {id: 'subtype', label: '项目类型', filter: true},
        {id: 'departmentName', label: '单位', filter: true},
        {id: 'principalName', label: '负责人', order: true},
        {id: 'status', label: '状态', order: true},
        {id: 'conclusion', label: '结论', order: true},
    ];

    constructor(
        private service: AdministrationService,
        private route: ActivatedRoute,
    ) {
        this.route.params.subscribe(params => {
            this.taskId = params['taskId'];
            this.type = params['type'];
            this.loadData();
        });
    }

    get cols(): number {
        return this.existExpertReview ? 13 : 10;
    }

    loadData() {
        this.service.loadProjects(this.taskId, {
            reportType: this.type,
        }).subscribe((dto: any) => {
            this.list = dto.list ? dto.list.map(r => new Review(r)) : null;
            this.isCheckTime = dto.isCheckTime;
            this.existExpertReview = dto.existExpertReview;
            if (this.existExpertReview) {
                this.ths = this.ths.concat([
                    {id: 'countOk', label: '同意', order: true},
                    {id: 'countVeto', label: '不同意', order: true},
                    {id: 'countWaiver', label: '弃权', order: true},
                    {id: 'countNull', label: '未评', order: true},
                    {id: 'average', label: '平均分', order: true},
                ]);
            }
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
