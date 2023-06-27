import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-info-basic-car',
  templateUrl: './info-basic-car.component.html',
  styleUrls: ['./info-basic-car.component.css']
})
export class InfoBasicCarComponent implements OnInit {

  public infoBasicForm: any;

  constructor(private controlContainer: ControlContainer){

  }

  ngOnInit(): void{
    this.infoBasicForm = this.controlContainer.control;
    this.infoBasicForm = this.infoBasicForm.controls["infoBasicForm"];
  }
}
