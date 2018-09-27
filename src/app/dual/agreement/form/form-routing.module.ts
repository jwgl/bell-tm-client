import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { AgreementCarryoutComponent } from './carryout/agreement-carryout-component';
import { AgreementFormEditorComponent } from './editor/form-editor.component';
import { AgreementItemComponent } from './item/item.component';
import { AgreementListComponent } from './list/form-list.component';

const routes: Routes = [
    { path: '', component: AgreementListComponent },
    { path: 'editor', component: AgreementFormEditorComponent, data: { mode: EditMode.Create } },
    { path: 'carryout', component: AgreementCarryoutComponent },
    { path: ':id/edit', component: AgreementFormEditorComponent, data: { mode: EditMode.Edit } },
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
