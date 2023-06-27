import { Component } from '@angular/core';
import { CarDto } from 'src/app/core/dto/CarDto';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {

   /**
   * Lista de carros del concesionario
   */
   public listCarsPortfolio: CarDto[];

   constructor(private carService: CarService) {
    this.carService.getAllCars().subscribe({
      next: value => {
        this.listCarsPortfolio = value;
        console.log(this.listCarsPortfolio)
      }
    })

  }
}
