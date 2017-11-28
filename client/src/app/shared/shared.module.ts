import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatButtonModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  imports: [ CommonModule, MatButtonModule, MatCardModule, FlexLayoutModule ],
  exports: [ CommonModule, MatButtonModule, MatCardModule, FlexLayoutModule ],
  declarations: []
})
export class SharedModule { }
