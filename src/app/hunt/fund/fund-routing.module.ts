import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FundListComponent } from './fund-list.component';

const routes: Routes = [
    { path: '', component: FundListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class FundRoutingModule { }
