import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUploaderModule } from 'ngx-uploader';

import { UploaderPanelComponent } from './uploader.component';

@NgModule({
  imports: [
    CommonModule,
    NgxUploaderModule,
  ],
  declarations: [UploaderPanelComponent],
  exports: [UploaderPanelComponent],
})
export class UploaderModule { }
