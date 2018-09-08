import { Component } from '@angular/core';

import { AuthService } from 'core/auth';

import { NavbarService } from './navbar.service';
import { Menu, MenuItem, isMenu } from './menu.model';

@Component({
    selector: 'tm-navbar',
    styleUrls: ['navbar.component.scss'],
    templateUrl: 'navbar.component.html',
})
export class NavbarComponent {
    menus: { main: Menu[], user: Menu[] };

    constructor(
        private service: NavbarService,
        private authService: AuthService,
    ) {
        this.service.loadList(['main', 'user']).subscribe(menus => {
            this.buildMenu(menus.main);
            this.buildMenu(menus.user);
            this.menus = menus;
        });
    }

    logout(event: Event): void {
        event.preventDefault();
        this.authService.logout().subscribe(() => {
            window.location.href = (event.target as HTMLAnchorElement).href;
        });
    }

    private buildMenu(items: (Menu | MenuItem)[]) {
        items.forEach(item => {
            if (isMenu(item)) {
                if (item.label.indexOf('${userName}') !== -1) {
                    item.label = item.label.replace('${userName}', this.authService.userInfo.name);
                }
                this.buildMenu(item.children);
            } else {
                if (item.url.indexOf('${userId}') !== -1) {
                    item.url = item.url.replace('${userId}', this.authService.userInfo.id);
                } else if (item.url.indexOf('${departmentId}') !== -1) {
                    item.url = item.url.replace('${departmentId}', this.authService.userInfo.departmentId);
                }
            }
        });
    }
}
