import { AuthService } from './../../../../admin/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { findIndex } from 'lodash'

import { Product } from './../../../carrinho-compras/Product';
import { ModoEntrega } from 'src/app/shared/modoEscolha/modoEscolha.component';
import { environment } from 'src/app/environment/environment-test';

@Injectable({
	providedIn: 'root'
})
export class StoreService {
	private cart: Product[] = [];
	private _cartItems$ = new BehaviorSubject<any>(undefined);
	private _tipoDeEntrega$ = new BehaviorSubject<ModoEntrega>({ tipo: '', valor: -1 });
	// private _cartItems$ = new ReplaySubject<Product[]>(1);
	private step$ = new BehaviorSubject<any>(undefined);

	constructor(private http: HttpClient,
		private authService: AuthService) { }

	getCartItems$() {
		return this._cartItems$.asObservable();
	}

	setCartItems$(value: Product) {
		if (value) {
			const existingProductIndex = findIndex(this.cart, (item) => item.id === value.id);
			const existingProduct = existingProductIndex !== -1

			if (existingProduct) {

				if (value.quantidade === 0) {
					this.cart.splice(existingProductIndex, 1);
				} else {
					this.cart[existingProductIndex] = {
						...this.cart[existingProductIndex],
						quantidade: value.quantidade,
					};
				}
			} else {
				this.cart.push(value);
			}

			this._cartItems$.next(this.cart);
		}
	}

	getTipoEntrega$() {
		return this._tipoDeEntrega$.asObservable();
	}

	setTipoEntrega$(value: ModoEntrega) {
		const valorAtual = this._tipoDeEntrega$.value.valor;
		if (value.valor == valorAtual) {
			return
		}
		this._tipoDeEntrega$.next(value);
	}

	setStepValue(value: any) {
		this.step$.next(value);
	}

	getStepValue() {
		return this.step$.asObservable();
	}

	addToCart(product: Product): Observable<Product> {
		// Lógica para adicionar um item ao carrinho
		// Atualize o BehaviorSubject
		return new Observable<Product>
	}

	removeFromCart(product: Product) {
		// Lógica para remover um item do carrinho
		// Atualize o BehaviorSubject
	}

	calculateTotal() {
		if (this.cart.length == 0) {
			return 0
		}
		const totalPreco = this.cart.reduce((acc, produto) => acc + ((produto.preco ?? 0) * (produto.quantidade ?? 0)), 0);
		return totalPreco
	}

	checkCupom(value: string): Observable<ICupom> {
		return this.http.get<ICupom>(`${environment.API_URL}/cupom/${value}`)
	}

	gerarPedido(dados: any): Observable<any> {
		// const payload = { itens, clienteId: 1, cartTotal, observacao };


		const payload = { ...dados, clienteId: this.authService.getUserId }
		console.log('payload', payload);
		return this.http.post<any>(`${environment.API_URL}/pedido`, payload);
	}
}

interface ICupom {
	porcentagem: number;
}
