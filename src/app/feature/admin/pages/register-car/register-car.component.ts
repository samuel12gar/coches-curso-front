import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.component.html',
  styleUrls: ['./register-car.component.css']
})
export class RegisterCarComponent  {

  public registerCarForm: FormGroup;

  constructor(private fb:FormBuilder){
    this.registerCarForm = this.fb.group({
      infoBasicForm: this.fb.group({
        brandCarId:['', Validators.required],
        brandCarString:['', Validators.required],
        reference:['', Validators.required],
        price:['', Validators.required],
        modelYear:['', Validators.required],
        category:['', Validators.required]   
      }),
      infoMechForm: this.fb.group({
        horsePower:['', Validators.required],
        engineDisplacement:['', Validators.required],
        transmission:['', Validators.required],
        fuelType:['', Validators.required],
        traction:['', Validators.required],
        steering:['', Validators.required]
      }),
      infoEstheticForm: this.fb.group({
        color:['', Validators.required],
        numberDoor:['', Validators.required],
        numberSeats:['', Validators.required],
        imagePath:['', Validators.required]
      })
      /*
      stock
      */
    });
  }
}
