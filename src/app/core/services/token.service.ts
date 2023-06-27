import { Injectable } from '@angular/core';
import { getCookie, setCookie } from 'typescript-cookie'
import jwt_decode from "jwt-decode";
import { CustomerJwtDto } from '../dto/customerJwtDto';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public getToken(): string{
    return getCookie("token");
  }

  public saveToken(token: string): void{

    setCookie("token",token, {expires:1,path:"/"});
    //localStorage.setItem("token",token);
  }

  public deleteToken(): void{

  }

  public getInfoToken(): CustomerJwtDto{
    let infoToken = jwt_decode(getCookie("token"));
    return <CustomerJwtDto>infoToken;
  }
}
