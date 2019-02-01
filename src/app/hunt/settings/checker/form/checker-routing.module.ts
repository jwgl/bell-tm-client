import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CheckerListComponent} from './list/form-list.component';

const routes: Routes = [
    {path: '', component: CheckerListComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class CheckerRoutingModule {}
