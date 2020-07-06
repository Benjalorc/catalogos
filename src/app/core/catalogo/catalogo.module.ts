import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@common/material';
import { CatalogoRoutingModule } from './catalogo-routing.module';
import { CatalogoComponent } from './catalogo.component';

@NgModule({
  declarations: [
    CatalogoComponent
  ],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class CatalogoModule { }
