import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const componentsArray = [FooterComponent, LoginComponent,
  NavComponent]

@NgModule({
  declarations: [...componentsArray],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [...componentsArray]
})
export class SharedModule { }
