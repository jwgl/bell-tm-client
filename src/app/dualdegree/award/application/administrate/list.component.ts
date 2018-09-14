import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApplicationsAdministrateService } from './administrate.service';

@Component({
    templateUrl: 'list.component.html',
})
export class ApplicationListComponent {
    list: any[];
    awardId: number;

    constructor(
        private route: ActivatedRoute,
        private service: ApplicationsAdministrateService,
    ) {
        const params = this.route.snapshot.params;
        this.awardId = params['id'];
        this.service.loadApplicationList({awardId: this.awardId})
            .subscribe(dto => {this.list = dto; });
    }

    downloadUrl(pre: string): string {
        return `${this.service.api.item(this.awardId)}/attachments?status=ALL&pre=${pre}`;
    }
}
