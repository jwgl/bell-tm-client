import { Component } from '@angular/core';

import { PublicService } from '../public.service';

@Component({
    templateUrl: 'public-list.component.html',
})
export class PublicListComponent {
    list: any[];

    constructor(service: PublicService) {
        service.loadList().subscribe((dto: any[]) => {
            this.list = dto;
        });
    }
}
