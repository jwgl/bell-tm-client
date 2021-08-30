import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabelComponent } from './label.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [LabelComponent],
  exports: [LabelComponent],
})
export class LabelModule { }
