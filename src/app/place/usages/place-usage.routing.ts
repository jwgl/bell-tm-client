import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlaceUsageComponent } from './place-usage.component';

const routes: Routes = [{
    path: '',
    component: PlaceUsageComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class PlaceUsageRoutingModule { }
