import { ProductService } from './../core/services/product/product.service';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { StoreService } from '../core/services/carrinho/store.service';
import { Product } from './Product';
import Swal from 'sweetalert2';
@Component({
	selector: 'app-carrinho-compras',
	templateUrl: './carrinho-compras.component.html',
	styleUrls: ['./carrinho-compras.component.scss']
})
export class CarrinhoComprasComponent implements OnInit, OnDestroy {
	stepAtual: number = 2;

	private readonly _subscription$: Subscription[] = []
	desconto: number = 0
	cartItems: Product[] = [];
	cartTotal: number = 0;
	frete: number = 0
	dadosDoPedido: { cartItems: Product[], frete: number, cartTotal: number, desconto: number, observacao?: string, modoEntrega: string } = { cartItems: [], frete: 0, cartTotal: 0, desconto: 0, observacao: "", modoEntrega: "" }
	steps: Record<string, boolean> = {
		'1': true,
		'2': true,
		'3': false,
		'4': false,
		'5': false
	};

	constructor(private storeService: StoreService,
		private productService: ProductService
	) {

		const sub = this.storeService.getCartItems$()
			.subscribe((items: Product[]) => {
				this.cartItems = items;
				this.dadosDoPedido.cartItems = items
				if (this.frete == -1) this.frete = 0
				this.cartTotal = this.storeService.calculateTotal() + (this.frete ?? 0);
				this.dadosDoPedido.cartTotal = this.cartTotal
			});

		this._subscription$.push(sub);
	}

	ngOnInit(): void {

		const sub = this.storeService.getTipoEntrega$()
			.subscribe(frete => {
				this.frete = frete.valor;
				this.dadosDoPedido.modoEntrega = frete.tipo
				this.dadosDoPedido.frete = this.frete
				let freteAtual
				if (this.frete == -1) {
					let freteAtual = 0
				} else freteAtual = this.frete
				this.cartTotal = this.storeService.calculateTotal() + (freteAtual ?? 0) - this.desconto;
				this.dadosDoPedido.cartTotal = this.cartTotal
			})

		this._subscription$.push(sub);
	}

	ngOnDestroy(): void {
		this._subscription$.forEach(sub => sub.unsubscribe());
	}

	ngOnChanges(changes: SimpleChanges) {
	}

	nextStep() {
		if (this.esqueceuModoRecebimento()) {
			Swal.fire('Deve escolhe um modo para receber seu pedido');
			return
		}

		if (this.stepAtual <= 5 && this.temItemCarrinho()) {
			this.steps[this.stepAtual++] = true;
		} else {
			this.notification()
		}
	}

	temItemCarrinho() {
		return this.cartItems?.length > 0
	}

	esqueceuModoRecebimento() {
		return this.frete < 0
	}

	cupom(ev: any) {
		const { porcentagem } = ev
		const desconto = this.cartTotal - (this.cartTotal * porcentagem / 100)

		this.desconto = this.cartTotal - desconto

		this.cartTotal -= this.desconto
		this.dadosDoPedido.cartTotal = this.cartTotal
		this.dadosDoPedido.desconto = this.desconto
	}

	irParaPagamento() {
		return this.stepAtual <= 4 ? "PRÓXIMO" : "Ir Para Pagamento"
	}

	notification() {
		Swal.fire('Escolha uma item', 'Precisa ter 1 item no carrinho para continuar!', 'error');
	}
}
