import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApplicationsAdministrateService } from './administrate.service';

@Component({
    styleUrls: ['list.component.scss'],
    templateUrl: 'list.component.html',
})
export class ApplicationListComponent {
    list: any[];
    awardId: number;

    options: any;

    constructor(
        private route: ActivatedRoute,
        private service: ApplicationsAdministrateService,
    ) {
        this.route.params.subscribe(params => {
            this.awardId = params['id'];
            const status = params['status'];
            this.service.loadApplicationList({ awardId: this.awardId, status })
                .subscribe(dto => this.loadData(dto));
        });
    }

    loadData(dto: any) {
        this.options = dto.statusList;
        this.list = dto.applicationList;
    }

    downloadUrl(pre: string): string {
        return `${this.service.api.item(this.awardId)}/attachments?status=ALL&pre=${pre}`;
    }
}
