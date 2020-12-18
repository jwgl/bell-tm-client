import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StatePipe } from './state-pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        StatePipe,
    ],
    exports: [
        StatePipe,
    ],
})
export class AssetPipesModule { }
