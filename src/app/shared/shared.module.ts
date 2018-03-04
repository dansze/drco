import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcticonDirective } from './octicon.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    OcticonDirective
  ],
  declarations: [OcticonDirective]
})
export class SharedModule { }
