import { Subscription } from 'rxjs';
import { AuthService } from './../../admin/services/auth.service';
import { UsuarioService } from './../core/services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-perfil',
	templateUrl: './perfil.component.html',
	styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
	usuarioForm!: FormGroup;

	cep!: string
	usuario!: any
	private sub = new Subscription()

	constructor(
		private fb: FormBuilder,
		private usuarioService: UsuarioService,
		private authService: AuthService
	) { }


	initForm() {
		this.usuarioForm = this.fb.group({
			nomeCompleto: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			senha: ['', Validators.required],
			rua: ['', Validators.required],
			numero: ['', Validators.required],
			bairro: ['', Validators.required],
			cidade: ['', Validators.required],
			cep: ['', Validators.required],
		});
	}
	ngOnInit(): void {
		this.initForm();
		const emailCliente = this.authService.getEmailCliente
		this.sub.add(
			this.usuarioService.getUsuario(emailCliente)
				.subscribe(user => {
					this.usuario = user
					this.usuarioForm.patchValue(user);
				})
		)
	}


	formatarCep(cep: string): string {
		// Remove todos os caracteres não numéricos
		cep = cep.replace(/\D/g, '');

		// Garanta que o CEP não tenha mais de 8 caracteres (incluindo hífens)
		if (cep.length > 8) {
			cep = cep.slice(0, 8);
		}

		// Verifica se o CEP tem pelo menos 8 dígitos (incluindo hífens)
		if (cep.length >= 8) {
			return cep.slice(0, 5) + '-' + cep.slice(5, 8);
		} else {
			return cep;
		}
	}

	limitarTamanho(event: KeyboardEvent): void {
		if (event.target instanceof HTMLInputElement) {
			const input = event.target;
			const cep = input.value;

			if (cep.length >= 8 && event.key !== 'Backspace' && event.key !== 'Delete') {
				event.preventDefault();
			}
		}
	}

	salvar() {
		if (this.usuarioForm.valid) {
			const usuarioData = this.usuarioForm.value;

			// this.usuarioService.atualizarUsuario(usuarioData).subscribe(
			// 	response => {
			// 		console.log('Usuario atualizado com sucesso!', response);
			// 	},
			// 	error => {
			// 		console.error('Erro ao atualizar usuario:', error);
			// 	}
			// );
		} else {
			console.log('Formulário inválido. Não foi possível salvar.');
		}
	}

}
