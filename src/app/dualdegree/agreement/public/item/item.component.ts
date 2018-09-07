import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AgreementForm } from '../../shared/form.model';
import { AgreementPublicService } from '../public.service';

@Component({
    templateUrl: 'item.component.html',
})
export class AgreementItemComponent {
    vm: AgreementForm;
    items: any[];

    constructor(
        private route: ActivatedRoute,
        private service: AgreementPublicService,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadItem<{items: any}>(params['id']).subscribe(dto => {
            this.vm = new AgreementForm(dto);
            this.items = dto.items;
        });
    }
}
