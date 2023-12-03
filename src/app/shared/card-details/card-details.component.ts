import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/components/carrinho-compras/Product';
import { StoreService } from 'src/app/components/core/services/carrinho/store.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-card-details',
	templateUrl: './card-details.component.html',
	styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit, OnDestroy {
	@Input() product!: Product
	@Input() categoria: string = ''

	quantidade: number = 1
	preco: number = 0
	private readonly sub$ = new Subscription()

	constructor(
		private storeService: StoreService,
		private _snackBar: MatSnackBar
	) { }

	ngOnDestroy(): void {
		this.sub$.unsubscribe();
	}

	ngOnInit() {
		this.preco = (this.product.preco ?? 0)
	}

	addToCart(product: Product) {
		if (!product) {
			return;
		}

		const newProduct = {
			...product,
			quantidade: this.quantidade
		}

		console.log(newProduct)

		this.storeService.setCartItems$(newProduct)

		this.openSnackBar()
	}
	openSnackBar() {
		this._snackBar.openFromComponent(SnackbarComponent, {
			duration: 3 * 1000,
		});
	}

	modificarValor(increment: boolean) {
		const incrementAmount = increment ? 1 : -1;
		const newValue = this.quantidade + incrementAmount;

		if (newValue >= 0 && newValue <= 100) {
			this.quantidade = newValue;
			this.product.preco = (this.preco ?? 0) * this.quantidade;
		}
	}
}
