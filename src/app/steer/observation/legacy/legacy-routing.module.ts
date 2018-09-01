import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LegacyItemComponent } from './item/legacy-item.component';
import { LegacyListComponent } from './list/legacy-list.component';

const routes: Routes = [
    { path: '', component: LegacyListComponent },
    { path: ':id', component: LegacyItemComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class LegacyRoutingModule { }
