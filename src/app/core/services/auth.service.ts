import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, tap } from 'rxjs';
import { AuthLoginRequestDto } from '../dto/authLoginRequestDto';
import { AuthLoginResponseDto } from '../dto/authLoginResponseDto';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) { 

  }

  public signIn(authDto: AuthLoginRequestDto): Observable<AuthLoginResponseDto>{
    //`${this.apiUrl}/auth/sign-in`
    //quitar lo que respuesta observable Observable<AuthLoginResponseDto>
    return this.http.post<AuthLoginResponseDto>(`${this.apiUrl}/auth/sign-in`,authDto).pipe(
      tap(response => {
        this.tokenService.saveToken(response.jwt);
      })
      );
   }
}