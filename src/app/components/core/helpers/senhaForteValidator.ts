import { AbstractControl, ValidatorFn } from '@angular/forms';

export function senhaForteValidator(): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		const senha = control.value;

		if (!senha) {
			return null;
		}

		const hasMinimumLength = senha.length >= 8;
		const hasNumber = /[0-9]/.test(senha);
		const hasUppercase = /[A-Z]/.test(senha);
		const hasSpecialChar = /[!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?]+/.test(senha);

		const isValid = hasMinimumLength && hasNumber && hasUppercase && hasSpecialChar;

		if (!isValid) {
			return { senhaForte: true };
		}

		return null;
	};
}
