import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DualStatusPipe } from './pipes/audit-status';
import { TypeTextPipe } from './pipes/paper-type';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        DualStatusPipe,
        TypeTextPipe,
    ],
    exports: [
        DualStatusPipe,
        TypeTextPipe,
    ],
})
export class PipesModule {}
