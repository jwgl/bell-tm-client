import { Component, Input } from '@angular/core';

import { ListGroupItem, ListOption } from '../common/list-group.model';

@Component({
    selector: 'tm-nav-tabs',
    styleUrls: ['nav-tabs.component.scss'],
    templateUrl: 'nav-tabs.component.html',
})
export class NavTabsComponent {
    @Input() set options(configs: ListOption[]) {
        this.items = configs ? configs.map(it => new ListGroupItem(it)) : null;
    }

    items: ListGroupItem[];

    active(value: ListGroupItem) {
        this.items.forEach(item => item.active = item === value ? true : false);
    }
}
