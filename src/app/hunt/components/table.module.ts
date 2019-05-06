import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';

import { TmGridComponent } from './table.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

library.add(faFilter);
@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        FontAwesomeModule,
    ],
    declarations: [
        TmGridComponent,
    ],
    exports: [
        TmGridComponent,
    ],
})
export class TmGridModule { }
