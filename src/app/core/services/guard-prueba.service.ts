import { Injectable } from '@angular/core';
import { Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class GuardPruebaService {

  constructor(private tokenService: TokenService, private router: Router) { }

  public canActiveWithAuth(): boolean{

    if(this.tokenService.getToken()){
      this.router.navigateByUrl("portafolio");
      return true;
    }

    return false;
  }

  public canActiveWithoutAuth(): boolean{

    if(!this.tokenService.getToken()){
      alert('No tiene permisos');
      this.router.navigateByUrl("autenticacion/inicio-sesion");
      return false;
    }

    return true;
  }
}
