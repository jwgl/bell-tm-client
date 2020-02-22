import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule } from 'ag-grid-angular';
import { CommonDirectivesModule } from 'core/common-directives';

import { TmGridComponent } from './table.component';
import { SetFilterComponent } from './set-filter.component';
import { HuntGridComponent } from './hunt-grid.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

library.add(faFilter);
@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        FontAwesomeModule,
        AgGridModule.withComponents([SetFilterComponent]),
    ],
    declarations: [
        TmGridComponent,
        SetFilterComponent,
        HuntGridComponent,
    ],
    exports: [
        TmGridComponent,
        HuntGridComponent,
    ],
})
export class TmGridModule { }
