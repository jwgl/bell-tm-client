import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { PlaceListComponent } from './list/form-list.component';
import { PlaceFormEditorComponent } from './editor/form-editor.component';
import { PlanEditorComponent } from './plan/editor/plan-editor.component';
import { PlaceItemComponent } from './item/item.component';
import { PlanListComponent } from './plan/list/plan-list.component';
import { PlanItemComponent } from './plan/item/item.component';

const routes: Routes = [
    { path: '', component: PlaceListComponent },
    { path: 'plan', component: PlanListComponent },
    { path: 'plan/:id', component: PlanItemComponent },
    { path: 'editor', component: PlaceFormEditorComponent, data: { mode: EditMode.Create } },
    { path: ':id/edit', component: PlaceFormEditorComponent, data: { mode: EditMode.Edit } },
    { path: ':id/plan', component: PlanEditorComponent, data: { mode: EditMode.Edit } },
    { path: ':id', component: PlaceItemComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class PlaceRoutingModule { }
