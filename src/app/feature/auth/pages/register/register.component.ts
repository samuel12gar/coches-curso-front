import { Component } from '@angular/core';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorsForm } from 'src/app/core/enums/ErrorsForm';
import { RegisterRequestDto } from 'src/app/core/dto/registerRequestDto';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends AppBaseComponent{

    /**
   * Formulario reactivo de registro
   */
    public registerForm: FormGroup;

    public passwordGenerated: string;

    public registered: boolean;

    //private cadena: string | number;
  constructor(private router:Router, private fb:FormBuilder, private authService: AuthService){
    super();
    this.registered=false;
    this.registerForm = this.fb.group({
      cardId:['',[Validators.required] ],
      fullName:['',Validators.required],
      email:['',[Validators.required,Validators.pattern("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
      + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")]],
      numberCellPhone:['',[Validators.required,Validators.pattern("^[0-9]*$")]]
    });
  }

  public async register(): Promise<void>{

    let dtoRegister: RegisterRequestDto = this.registerForm.value;
    console.log("Formulario a guardar",this.registerForm.value);

    if(this.registerForm.valid){
      await lastValueFrom(this.authService.register(dtoRegister)).then(resp =>{
      this.passwordGenerated = resp.password;        
      });
      this.registered = true;
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hay errores en el formulario, reviselo por favor'
      });
      console.log(this.getAllErrorsForm(this.registerForm));
      this.registerForm.markAllAsTouched();
    }
  }

  public getErrorForm(field: string): string{

    let message = '';

    const required: Array<string> = ["cardId","fullName","email","numberCellPhone"];
    
    const formatEmail: Array<string> = ["email"];
    
    const onlyNumber: Array<string> = ["numberCellPhone"];
    
    
    if(this.isTouchedField(this.registerForm,field)){
      
      if(required.includes(field) && this.registerForm.get(field).hasError('required')){
        message = ErrorsForm.REQUIRED
      }else if(formatEmail.includes(field) && this.registerForm.get(field).hasError('pattern')){
        message = ErrorsForm.EMAIL_FORMAT;
      }else if(onlyNumber.includes(field) && this.registerForm.get(field).hasError('pattern')){
        message = ErrorsForm.ONLY_NUMBER;
      }
    }
    return message;
}

}
