import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VisionReviewComponent } from './vision-review.component';

const routes: Routes = [{
    path: ':id',
    component: VisionReviewComponent
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class VisionReviewRoutingModule { }
