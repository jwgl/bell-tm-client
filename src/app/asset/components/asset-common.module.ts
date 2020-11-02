import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CommonDirectivesModule } from 'core/common-directives';

import { SetFilterComponent } from './set-filter.component';
import { PlaceGridComponent } from './place-grid.component';
import { SelectOrOtherComponent } from './select-or-other.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilter, faLock, faLockOpen, faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faFilter, faLock, faLockOpen, faUser);
@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        FontAwesomeModule,
        FormsModule,
        AgGridModule.withComponents([SetFilterComponent]),
    ],
    declarations: [
        SetFilterComponent,
        PlaceGridComponent,
        SelectOrOtherComponent,
    ],
    exports: [
        PlaceGridComponent,
        SelectOrOtherComponent,
    ],
})
export class TmAssetCommonModule { }
