import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgUploaderModule } from 'ngx-uploader';

import { UploaderPanelComponent } from './uploader.component';

@NgModule({
  imports: [
    CommonModule,
    NgUploaderModule,
  ],
  declarations: [UploaderPanelComponent],
  exports: [UploaderPanelComponent],
})
export class UploaderModule { }
