import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { TmGridModule } from '../../components/table.module';
import { PlaceListComponent } from './form-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
        TmGridModule,
    ],
    declarations: [
        PlaceListComponent,
    ],
    exports: [
        PlaceListComponent,
    ],
})
export class PlaceListModule { }
