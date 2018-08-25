import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SchemePublicListComponent } from './list/public-list.component';
import { SchemePublicItemComponent } from './item/public-item.component';

const routes: Routes = [{
    path: '',
    component: SchemePublicListComponent,
}, {
    path: ':id',
    component: SchemePublicItemComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class SchemePublicRoutingModule { }
