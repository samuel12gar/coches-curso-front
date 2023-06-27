import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {
    console.log("constructor interceptor");
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("entre al interceptor");

    let headers;

    let token = this.tokenService.getToken();
    console.log("token "+token);
    if(!token){
      console.log("salida");
      return next.handle(request);
    }  
      
      headers = {
        'Authorization':'Bearer '+token
      }

    let authRequest = request.clone({
      setHeaders:{
        ...headers
      }
    });
    console.log(authRequest);
    //'Access-Control-Allow-Origin':'*'
    return next.handle(authRequest).pipe(
      catchError((err:HttpErrorResponse)=>{
        console.log(err.status);
        if(err.status == 403){
          console.log("Fallo en la autenticacion");
          /*Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No tiene permisos para acceder a esta pagina.'
          });*/
        }
        return throwError( ()=> err);
      })
    );  
  }
}
