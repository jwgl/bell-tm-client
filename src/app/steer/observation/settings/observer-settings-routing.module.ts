import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ObserverListComponent } from './list/observer-list.component';

const routes: Routes = [
    { path: '', component: ObserverListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRoutingModule { }
