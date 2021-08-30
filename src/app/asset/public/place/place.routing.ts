import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlaceListComponent } from './list/form-list.component';
import { PlaceItemComponent } from './item/item.component';

const routes: Routes = [
    { path: '', component: PlaceListComponent },
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
