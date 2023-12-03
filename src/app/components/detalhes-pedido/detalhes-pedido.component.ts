import { Router } from '@angular/router';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../carrinho-compras/Product';
import { Subscription, delay } from 'rxjs';
import { AuthService } from './../../admin/services/auth.service';
import Swal from 'sweetalert2';
import { StoreService } from '../core/services/carrinho/store.service';

@Component({
	selector: 'app-detalhes-pedido',
	templateUrl: './detalhes-pedido.component.html',
	styleUrls: ['./detalhes-pedido.component.scss']
})
export class DetalhesPedidoComponent implements OnInit, OnDestroy {
	@Input() dadosPedidos!: { cartItems: Product[], frete: number, cartTotal: number, desconto: number, observacao?: string, modoEntrega: string }
	private readonly sub$ = new Subscription();

	constructor(
		private _storeService: StoreService,
		private router: Router,
		private authService: AuthService
	) { }

	ngOnDestroy(): void {
		this.sub$.unsubscribe();
	}

	ngOnInit(): void {

	}

	concluirPedido() {
		if (this.isCartEmpty()) {
			return;
		}

		const payload = this.generatePayload();

		if (!this.authService.isLoggedIn()) {
			Swal.fire('Precisa estar logado.')
			return
		}


		const sub = this._storeService
			.gerarPedido(payload)
			// .pipe(delay(3000))
			.subscribe(
				() => {
					this.pedidoCriado();
				},
				(error) => {
					this.handlerErrorPedido(error);
				}
			);

		this.sub$.add(sub);
	}

	private handlerErrorPedido(error: any) {
		console.error('Erro ao gerar pedido:', error);
		Swal.fire("Erro ao gerar pedido.");
	}

	private pedidoCriado() {

		Swal.fire({
			position: 'top-end',
			icon: 'success',
			title: 'Pedido Gerado com sucesso!',
			showConfirmButton: false,
			timer: 1500
		})

		this.router.navigate(['/']);
	}

	generatePayload() {
		return {
			itens: this.dadosPedidos.cartItems,
			cartTotal: this.dadosPedidos.cartTotal,
			observacao: this.dadosPedidos.observacao ?? "",
			modoEntrega: this.dadosPedidos.modoEntrega
		};
	}

	isCartEmpty(): boolean {
		return this.dadosPedidos.cartItems.length === 0;
	}
}
