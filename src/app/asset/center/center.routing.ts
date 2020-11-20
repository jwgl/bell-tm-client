import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';
import { CenterListComponent } from './list/form-list.component';

const routes: Routes = [
    { path: '', component: CenterListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class CenterRoutingModule { }
