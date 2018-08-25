import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LogoComponent } from './logo.component';
import { NavbarService } from './navbar.service';
import { NavbarComponent } from './navbar.component';
import { NavitemComponent } from './navitem.component';
import { NavmenuComponent } from './navmenu.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        LogoComponent,
        NavbarComponent,
        NavitemComponent,
        NavmenuComponent,
    ],
    exports: [
        NavbarComponent,
    ],
    providers: [
        NavbarService,
        { provide: 'MENU_API_URL', useValue: '/api/menus' },
    ],
})
export class NavbarModule { }
