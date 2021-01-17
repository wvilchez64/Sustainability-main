import { AbstractControl} from '@angular/forms';

export function excludeUserNameValidator(control: AbstractControl) {
    if (String(control.value).toLowerCase() == 'google' || String(control.value).toLowerCase() == 'facebook') {
        return {exclude : true}
    } 
    return null
}