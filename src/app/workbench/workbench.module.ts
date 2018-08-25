import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { Page404Component } from './p404/p404.component';
import { NavbarModule } from './navbar/navbar.module';
import { WorkbenchRoutingModule } from './workbench.routing';
import { WorkbenchComponent } from './workbench.component';

@NgModule({
    declarations: [
        HomeComponent,
        Page404Component,
        WorkbenchComponent,
    ],
    imports: [
        CommonModule,
        WorkbenchRoutingModule,
        NavbarModule,
    ],
})
export class WorkbenchModule { }
