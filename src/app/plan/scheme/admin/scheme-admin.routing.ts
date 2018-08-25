import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SchemeAdminListComponent } from './list/admin-list.component';
import { SchemeAdminItemComponent } from './item/admin-item.component';

const routes: Routes = [{
    path: '',
    component: SchemeAdminListComponent,
}, {
    path: ':id',
    component: SchemeAdminItemComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class SchemeAdminRoutingModule { }
