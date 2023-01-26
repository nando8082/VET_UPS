import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearCitaPageRoutingModule } from './crear-cita-routing.module';

import { CrearCitaPage } from './crear-cita.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    CrearCitaPageRoutingModule
  ],
  declarations: [CrearCitaPage]
})
export class CrearCitaPageModule {}
