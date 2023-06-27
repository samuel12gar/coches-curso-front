import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDto } from '../dto/CarDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }


  public getAllCars(): Observable<CarDto[]> {
    return this.http.get<CarDto[]>(`${this.apiUrl}/cars`);
  }
}
