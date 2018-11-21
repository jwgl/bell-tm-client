import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResponseFormEditorComponent } from './editor/form-editor.component';
import { ResponseFormFinishComponent } from './finish/form-finish.component';

const routes: Routes = [{
    path: '',
    component: ResponseFormEditorComponent,
}, {
    path: 'finish',
    component: ResponseFormFinishComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ResponseFormRoutingModule { }
