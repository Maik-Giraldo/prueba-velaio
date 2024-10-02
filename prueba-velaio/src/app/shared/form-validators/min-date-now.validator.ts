import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador que verifica que la fecha seleccionada sea posterior a la fecha actual
 */
export function minDateNowValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) {
            return null;
        }

        const date = new Date(value);
        const now = new Date();

        if (date < now) {
            return {
                minDateNow: true,
            };
        }

        return null;
    };
}
