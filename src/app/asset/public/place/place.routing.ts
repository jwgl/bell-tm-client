import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlaceListComponent } from './list/form-list.component';
import { PlaceItemComponent } from './item/item.component';
import { PlanListComponent } from './plan/plan-list.component';
import { PlanItemComponent } from './plan/plan-item.component';
import {} from './plan/plan-item.module';

const routes: Routes = [
    { path: '', component: PlaceListComponent },
    { path: 'plan', component: PlanListComponent },
    { path: 'plan/:id', component: PlanItemComponent },
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
