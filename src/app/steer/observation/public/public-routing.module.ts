import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LegacyItemComponent } from './item/legacy-item.component';
import { PublicItemComponent } from './item/public-item.component';
import { PublicListComponent } from './list/public-list.component';

const routes: Routes = [
    { path: '', component: PublicListComponent },
    { path: ':id', component: PublicItemComponent },
    { path: ':id/legacy', component: LegacyItemComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class PublicRoutingModule { }
