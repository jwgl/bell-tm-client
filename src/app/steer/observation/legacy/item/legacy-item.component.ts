import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LegacyService } from '../legacy.service';

@Component({
    templateUrl: 'legacy-item.component.html',
})
export class LegacyItemComponent {
    vm: any;

    constructor(
        private route: ActivatedRoute,
        private service: LegacyService,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadItem(params['id']).subscribe(dto => {
            this.vm = dto;
        });
    }

}
