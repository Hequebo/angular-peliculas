import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function firstCapitalLetter(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = <string>control.value;

        if (!value)
            return null;
        if (value.length === 0)
            return null;

        const firstLetter = value[0];

        if (firstLetter !== firstLetter.toUpperCase()) {
            return {
                firstCapitalLetter: {
                    message: 'La primera letre debe de ser mayúscula'
                }
            }
        }

        return null;
    }
}

export function dateCantBeFuture(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const userPickedDate = new Date(control.value);
        const today = new Date();

        if (userPickedDate > today) {
            return {
                future: {
                    message: 'La fecha no puede ser del fúturp'
                }
            }
        }
        return null;
    }
}