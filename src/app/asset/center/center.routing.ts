import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CenterListComponent } from './list/form-list.component';
import { AssetItemComponent } from './item/item.component';

const routes: Routes = [
    { path: '', redirectTo: 'assets', pathMatch: 'full' },
    { path: 'assets', component: CenterListComponent },
    { path: 'assets/:id', component: AssetItemComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class CenterRoutingModule { }
