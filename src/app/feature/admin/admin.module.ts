import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { AdminRoutingModule } from './admin-routing.module';
import { RegisterCarComponent } from './pages/register-car/register-car.component';
import { InfoBasicCarComponent } from './components/info-basic-car/info-basic-car.component';


@NgModule({
  declarations: [
    RegisterCarComponent,
    InfoBasicCarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule, 
    ReactiveFormsModule 
  ]
})
export class AdminModule { }
