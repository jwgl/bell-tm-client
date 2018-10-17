import { Component } from '@angular/core';

import { FinderService } from './finder.service';

@Component({
    templateUrl: 'list.component.html',
})
export class FinderListComponent {
    list: any[];
    query: string;

    constructor(private service: FinderService) { }

    find() {
        this.service.loadList({ q: this.query }).subscribe(dto => this.list = dto);
    }

    get url(): string {
        return `${this.service.api.item(0)}/report?q=${encodeURIComponent(this.query)}&type=applications-admin`;
    }
}
