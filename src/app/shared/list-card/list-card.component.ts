import { StoreService } from './../../components/core/services/carrinho/store.service';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/components/carrinho-compras/Product';

@Component({
	selector: 'app-list-card',
	templateUrl: './list-card.component.html',
	styleUrls: ['./list-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCardComponent implements OnInit {
	@Input() cartItem!: Product;
	quantidade: number = 0;

	constructor(
		private storeServices: StoreService
	) { }

	ngOnInit(): void {
		this.cartItem
		console.log("🚀 ~ file: list-card.component.ts:21 ~ ListCardComponent ~ ngOnInit ~ cartItem:", this.cartItem)
		this.quantidade = (this.cartItem.quantidade ?? 0)
	}

	diminuirQuantidade() {
		// if (this.quantidade > 1) {
		this.quantidade--
		this.cartItem.quantidade = this.quantidade
		debugger
		this.storeServices.setCartItems$(this.cartItem)
		// }
	}

	aumentarQuantidade() {
		this.quantidade++
		this.cartItem.quantidade = this.quantidade
		this.storeServices.setCartItems$(this.cartItem)
	}

	calculateTotalPrice(): number {
		return (this.cartItem.quantidade ?? 0) * (this.cartItem.preco ?? 0);
	}

}
