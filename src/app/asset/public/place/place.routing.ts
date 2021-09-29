import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlaceListComponent } from './list/form-list.component';
import { PlaceItemComponent } from './item/item.component';
import { PlanListComponent } from './plan/plan-list.component';

const routes: Routes = [
    { path: '', component: PlaceListComponent },
    { path: 'labelSearch', component: PlanListComponent },
    { path: 'labelSearch/:id', component: PlaceItemComponent },
    { path: ':id', component: PlaceItemComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class PlacePubicRoutingModule { }
