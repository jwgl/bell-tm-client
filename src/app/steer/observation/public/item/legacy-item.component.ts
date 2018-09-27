import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PublicService } from '../public.service';

@Component({
    templateUrl: 'legacy-item.component.html',
})
export class LegacyItemComponent {
    vm: any;

    constructor(
        private route: ActivatedRoute,
        private service: PublicService,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadLegacyItem(params['id']).subscribe(dto => {
            this.vm = dto;
        });
    }

}
