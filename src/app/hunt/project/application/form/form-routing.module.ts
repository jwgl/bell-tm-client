import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { EditMode } from 'core/constants';

import { ProjectFormEditorComponent } from './editor/form-editor.component';
import { ProjectItemComponent } from './item/item.component';
import { TaskItemComponent } from './reviewtask/item';
import { TaskListComponent } from './reviewtask/list';
import { FundViewComponent } from './fund/fund-view.component';

const routes: Routes = [
    { path: '', component: TaskListComponent},
    { path: ':reviewTaskId/applications/:applicationId', component: ProjectItemComponent },
    { path: ':reviewTaskId/create', component: ProjectFormEditorComponent, data: { mode: EditMode.Create }},
    { path: ':reviewTaskId/applications/:applicationId/edit', component: ProjectFormEditorComponent, data: { mode: EditMode.Edit }},
    { path: ':reviewTaskId/applications/:projectId/fund', component: FundViewComponent},
    { path: ':id', component: TaskItemComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class RoutingModule {}
