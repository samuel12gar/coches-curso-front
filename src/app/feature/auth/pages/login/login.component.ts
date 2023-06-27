import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';
import { AuthLoginRequestDto } from 'src/app/core/dto/authLoginRequestDto';
import { AuthService } from 'src/app/core/services/auth.service';
import { lastValueFrom } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';
import { ErrorsForm } from 'src/app/core/enums/ErrorsForm';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AppBaseComponent {

  /**
   * Formulario reactivo de login
   */
    public loginForm: FormGroup;

  //private cadena: string | number;
  constructor(private router:Router, private fb:FormBuilder, private authService: AuthService, private tokenService: TokenService){
    super();
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email] ],
      password:['',Validators.required]
    });
  }


  public async signIn(): Promise<void>{

    let dtoLogin:AuthLoginRequestDto;

    if(this.loginForm.valid){
      alert('Todo correcto');
      let email = this.loginForm.get('email').value;
      let password = this.loginForm.get('password').value;
      dtoLogin = {
        email,
        password
      };
      console.log(dtoLogin);
      await lastValueFrom(this.authService.signIn(dtoLogin));
      console.log(this.tokenService.getToken());
      await this.router.navigateByUrl("/portafolio");
      //console.log(localStorage.getItem("token"));
      //this.loginForm.get('email').setValue('prueba@hotmail.com');
    }else{
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hay errores en el formulario, reviselo por favor'
      });

      console.log(this.getAllErrorsForm(this.loginForm));
      this.loginForm.markAllAsTouched();
    }
    
  }


  public getErrorForm(field: string): string{

      let message = '';

      if(this.isTouchedField(this.loginForm,field)){
        if(this.loginForm.get(field).hasError('required')){
          message = ErrorsForm.REQUIRED;
        }else if(this.loginForm.get(field).hasError('email')){
          message = ErrorsForm.EMAIL_FORMAT;
        }
      }
      return message;
  }

}
