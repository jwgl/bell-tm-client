import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUploaderModule } from 'ngx-uploader';

import { UploaderPanelComponent } from './uploader.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [
    CommonModule,
    NgxUploaderModule,
    FontAwesomeModule,
  ],
  declarations: [UploaderPanelComponent],
  exports: [UploaderPanelComponent],
})
export class UploaderModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTimes);
  }
}
