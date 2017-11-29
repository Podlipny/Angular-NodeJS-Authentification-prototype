import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@NgModule({
  imports: [ CommonModule ],
  exports: [ CommonModule ],
  declarations: [],
  providers: [
    AuthService
  ]
})
export class CoreModule { }
