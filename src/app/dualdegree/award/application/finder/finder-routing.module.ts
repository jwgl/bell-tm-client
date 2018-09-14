import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FinderItemComponent} from './item.component';
import {FinderListComponent} from './list.component';

const routes: Routes = [
    {path: '', component: FinderListComponent},
    {path: ':id', component: FinderItemComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class BatchRoutingModule {}
