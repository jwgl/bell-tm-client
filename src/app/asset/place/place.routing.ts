import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlaceListComponent } from './list/form-list.component';

const routes: Routes = [
    { path: '', component: PlaceListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class PlaceRoutingModule { }
