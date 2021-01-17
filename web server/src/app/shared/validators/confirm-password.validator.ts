import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator: 
    ValidatorFn = (formGroup: FormGroup):
    ValidationErrors | null => {

    const password = formGroup.get('password').value;
    const confirm = formGroup.get('confirm').value;
    if(password.trim() + confirm.trim()) {
        return password != confirm 
        ? { mismatch: true }
        : null;
    } else {
        return null;
    }
};

