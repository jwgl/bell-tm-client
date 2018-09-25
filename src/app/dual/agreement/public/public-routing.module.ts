import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AgreementItemComponent} from './item/item.component';
import {AgreementListComponent} from './list/form-list.component';

const routes: Routes = [
    { path: '', component: AgreementListComponent },
    { path: ':id', component: AgreementItemComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class AgreementRoutingModule { }
