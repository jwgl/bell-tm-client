import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeanItemComponent } from './item/item.component';
import { DeanListComponent } from './list/form-list.component';

const routes: Routes = [
    { path: '', component: DeanListComponent },
    { path: 'list', component: DeanListComponent },
    { path: ':id', component: DeanItemComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ObservationRoutingModule { }
