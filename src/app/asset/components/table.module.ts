import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule } from 'ag-grid-angular';
import { CommonDirectivesModule } from 'core/common-directives';

import { SetFilterComponent } from './set-filter.component';
import { PlaceGridComponent } from './place-grid.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilter, faLock, faLockOpen, faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faFilter, faLock, faLockOpen, faUser);
@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        FontAwesomeModule,
        AgGridModule.withComponents([SetFilterComponent]),
    ],
    declarations: [
        SetFilterComponent,
        PlaceGridComponent,
    ],
    exports: [
        PlaceGridComponent,
    ],
})
export class TmGridModule { }
