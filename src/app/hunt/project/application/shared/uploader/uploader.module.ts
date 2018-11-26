import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUploaderModule } from 'ngx-uploader';

import { UploaderPanelComponent } from './uploader.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes);
@NgModule({
  imports: [
    CommonModule,
    NgxUploaderModule,
    FontAwesomeModule,
  ],
  declarations: [UploaderPanelComponent],
  exports: [UploaderPanelComponent],
})
export class UploaderModule { }
