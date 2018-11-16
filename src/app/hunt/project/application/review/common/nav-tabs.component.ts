import { Component, Input } from '@angular/core';

import { ListGroupItem, ListOption } from '../common/list-group.model';

@Component({
    selector: 'tm-nav-tabs',
    styleUrls: ['nav-tabs.component.scss'],
    templateUrl: 'nav-tabs.component.html',
})
export class NavTabsComponent {
    items: ListGroupItem[];

    @Input() set options(configs: ListOption[]) {
        this.items = configs ? configs.map(it => new ListGroupItem(it)) : null;
    }
}
