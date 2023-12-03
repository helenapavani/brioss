import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export function emailsIguaisValidator(control: FormGroup): ValidationErrors | null {
	const email = control.get('email');
	const emailConfirmacao = control.get('emailConfirm');

	if (email?.value !== emailConfirmacao?.value) {
		emailConfirmacao?.setErrors({ emailsDiferentes: true });
		return { emailsDiferentes: true };
	}

	return null;
}
