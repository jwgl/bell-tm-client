import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormService } from '../form.service';

@Component({
    templateUrl: 'project-list.component.html',
})
export class ProjectListComponent {
    list: any[];

    taskId: number;
    type: string;

    options = [
        { label: '年度', type: 2, count: 0 },
        { label: '中期', type: 3, count: 0 },
        { label: '结题', type: 4, count: 0 },
    ];

    constructor(
        private service: FormService,
        private route: ActivatedRoute,
    ) {
        this.route.params.subscribe(params => {
            this.taskId = params['id'];
            this.type = params['type'];
            this.loadData();
        }
        );
    }

    loadData() {
        this.service.loadProjects(this.taskId, {
            queryType: 'checked',
            reportType: this.type,
        }).subscribe((dto: any) => {
            this.list = dto.list;
            const counts = dto.counts;
            this.options.forEach(item => {
                const count = counts.find(c => c.reportType === item.type);
                if (count) {
                    item.count = count.value;
                }
            });
        });
    }

    removable(item: any): boolean {
        return item && item.status === 'CREATED';
    }

    remove(item: any) {

    }
}
