/*
,{
   validator: confirmPasswordValidator('password', 'confirm')
});

export function confirmPasswordValidator(password: string, confirm: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[password];
        const matchingControl = formGroup.controls[confirm];

        if (matchingControl.errors && !matchingControl.errors.mismatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mismatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
*/