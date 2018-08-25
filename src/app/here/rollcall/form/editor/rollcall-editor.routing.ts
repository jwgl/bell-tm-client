import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RollcallDetailViewComponent } from './detail-view.component';
import { RollcallFormEditorComponent } from './rollcall-editor.component';
import { RollcallListViewComponent } from './list-view.component';
import { RollcallLockViewComponent } from './lock-view.component';
import { RollcallTileViewComponent } from './tile-view.component';
import { RollcallFormEditorResolve } from './rollcall-editor-resolve.service';
import { RollcallFormResolve } from '../rollcall-form.resolve';
import { RollcallLockGuard } from './lock-guard.service';

const routes: Routes = [{
    path: 'timeslots/:timeslotId/weeks/:week',
    component: RollcallFormEditorComponent,
    resolve: {
        list: RollcallFormResolve,
        form: RollcallFormEditorResolve,
    },
    children: [{
        path: 'detail',
        component: RollcallDetailViewComponent,
        canActivate: [RollcallLockGuard],
    }, {
        path: 'list',
        component: RollcallListViewComponent,
        canActivate: [RollcallLockGuard],
    }, {
        path: 'tile',
        component: RollcallTileViewComponent,
        canActivate: [RollcallLockGuard],
    }, {
        path: 'lock',
        component: RollcallLockViewComponent,
    }],
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
    providers: [
        RollcallFormEditorResolve,
        RollcallLockGuard,
    ],
})
export class RollcallFormRoutingModule { }
