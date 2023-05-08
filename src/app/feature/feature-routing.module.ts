import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthWithoutGuard } from '../core/guards/auth-without.guard';
import { AuthWithGuard } from '../core/guards/auth-with.guard';
import { GuardPruebaService } from '../core/services/guard-prueba.service';


const routes: Routes = [
  {
    path:"autenticacion",
    canActivate: [()=> inject(GuardPruebaService).canActiveWithAuth()]
    //canActivate: [AuthWithGuard],
    loadChildren: ()=> import("./auth/auth.module").then(a=>a.AuthModule)
  },
  {
    path:"portafolio",
    canActivate: [()=> inject(GuardPruebaService).canActiveWithoutAuth()]
    //canActivate: [AuthWithoutGuard],
    loadChildren: ()=> import("./home/home.module").then(h=>h.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
