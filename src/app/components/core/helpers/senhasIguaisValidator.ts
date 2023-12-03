import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export function senhasIguaisValidator(control: FormGroup): ValidationErrors | null {
	const senha = control.get('senha');
	const senhaConfirmacao = control.get('passwordConfirm');

	if (senha?.value !== senhaConfirmacao?.value) {
		senhaConfirmacao?.setErrors({ senhasDiferentes: true });
		return { senhasDiferentes: true };
	}

	return null;
}
