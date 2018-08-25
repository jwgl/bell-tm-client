import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: '.nav-item[menu]',
    templateUrl: 'navitem.component.html',
})
export class NavitemComponent {
    @Input() menu: any;

    @HostBinding('class.dropdown')
    get hasChildren() {
        return this.menu.children !== undefined;
    }
}
