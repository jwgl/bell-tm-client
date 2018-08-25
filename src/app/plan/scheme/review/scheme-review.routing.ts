import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SchemeReviewComponent } from './scheme-review.component';

const routes: Routes = [{
    path: ':id',
    component: SchemeReviewComponent
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class SchemeReviewRoutingModule { }
