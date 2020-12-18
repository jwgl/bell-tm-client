import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssetModelListComponent } from './list/form-list.component';

const routes: Routes = [
    { path: '', component: AssetModelListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class AssetModelRoutingModule { }
