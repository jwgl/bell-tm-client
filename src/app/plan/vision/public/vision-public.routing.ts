import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VisionPublicListComponent } from './list/public-list.component';
import { VisionPublicItemComponent } from './item/public-item.component';

const routes: Routes = [{
    path: '',
    component: VisionPublicListComponent
}, {
    path: ':id',
    component: VisionPublicItemComponent
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class VisionPublicRoutingModule { }
