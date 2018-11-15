import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReviewListComponent } from './list/review-list.component';
import { ReviewComponent } from './review.component';

const routes: Routes = [{
    path: '',
    component: ReviewComponent,
    children: [{
        path: '', redirectTo: '1', pathMatch: 'full'
    }, {
        path: ':reviewType',
        children: [{
            path: '', redirectTo: 'todo', pathMatch: 'full'
        }, {
            path: ':type',
            children: [{
                path: '',
                component: ReviewListComponent,
            }],
        }],
    }],
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ReviewRoutingModule { }
