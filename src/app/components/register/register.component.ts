import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy } from '@angular/core';
import { CadastroService } from './../core/services/cadastro/cadastro.service';
import { Subscription } from 'rxjs';
import { senhaForteValidator } from '../core/helpers/senhaForteValidator';
import { senhasIguaisValidator } from '../core/helpers/senhasIguaisValidator';
import { emailsIguaisValidator } from '../core/helpers/emailsIguaisValidator';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
	private readonly sub$ = new Subscription();

	showPassword: boolean = false;
	cadastroSucesso: boolean = false;
	camposTocados = { email: false, emailConfirm: false };
	cadastroForm: FormGroup;

	constructor(private formBuilder: FormBuilder, private cadastroService: CadastroService) {
		this.cadastroForm = this.formBuilder.group({
			nomeCompleto: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			emailConfirm: ['', [Validators.required, Validators.email]],
			senha: ['', [Validators.required, senhaForteValidator()]],
			passwordConfirm: ['', Validators.required],
			checkTermo: [false, Validators.requiredTrue],
		}, { validators: [senhasIguaisValidator, emailsIguaisValidator] });
	}

	ngOnDestroy(): void {
		if (this.sub$) {
			this.sub$.unsubscribe();
		}
	}

	togglePasswordVisibility() {
		this.showPassword = !this.showPassword;
	}

	cadastrar() {
		if (this.cadastroForm.valid) {
			const sub = this.cadastroService.cadastrar(this.cadastroForm.value).subscribe(res => {
				if (res.message) {
					this.cadastroSucesso = true
				}
			})
			this.sub$.add(sub);
		}
	}

}
