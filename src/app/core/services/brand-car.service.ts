import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { brandCarDto } from '../dto/brandCarDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandCarService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http:HttpClient) { }

  
  getAllBrandsCar(): Observable<brandCarDto[]>{
    return this.http.get<brandCarDto[]>(`${this.apiUrl}/cars`);
  }
}
