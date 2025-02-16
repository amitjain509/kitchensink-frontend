import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  // Validator for phone number (e.g., 10 digits)
  phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validPhoneNumberPattern = /^(\\+91[\\s-]?)?[6-9]\\d{9}$/;
      return validPhoneNumberPattern.test(control.value) ? null : { invalidPhoneNumber: 'Phone number must be 10 digits.' };
    };
  }

  // Validator for email
  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return validEmailPattern.test(control.value) ? null : { invalidEmail: 'Please enter a valid email address.' };
    };
  }

  // Validator for required field (this is built-in but can be extended)
  requiredValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value ? null : { required: 'This field is required.' };
    };
  }

  // Custom length validator
  lengthValidator(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value && control.value.length <= maxLength ? null : { maxLength: `Maximum length is ${maxLength} characters.` };
    };
  }

  // Custom pattern validator
  patternValidator(pattern: RegExp, errorKey: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return pattern.test(control.value) ? null : { [errorKey]: 'Invalid format.' };
    };
  }
}
