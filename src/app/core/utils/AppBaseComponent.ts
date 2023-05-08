import { FormArray,FormGroup } from '@angular/forms';

/**
 * Componente padre de validaciones generales
 */

export class AppBaseComponent{

    /**
     * Valida si tocaran un input
     * @param form nombre del formulario de donde esta la pantalla
     * @param field el nombre del campo
     * @returns devuelve si se toco el input true de lo contrario false
     */
    public isTouchedField = (form: FormGroup, field: string): boolean =>{
        return form.get(field).touched === true && form.get(field).invalid;
    }

     /**
   * Retorna todos los errores o validaciones presentes en el FormGroup
   * @param form Form a evaluar
   */
  public getAllErrorsForm(form: FormGroup | FormArray): { [key: string]: any; } | null {
    let hasError = false;
    const result = Object.keys(form.controls).reduce((acc, key) => {
      const control = form.get(key);
      const errors = (control instanceof FormGroup || control instanceof FormArray)
        ? this.getAllErrorsForm(control)
        : control.errors;
      if (errors) {
        acc[key] = errors;
        hasError = true;
      }
      return acc;
    }, {} as { [key: string]: any; });
    return hasError ? result : null;
  }
}