import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FreeListenViewComponent } from './free-listen-view.component';

const routes: Routes = [{
    path: ':id',
    component: FreeListenViewComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class FreeListenViewRoutingModule { }
