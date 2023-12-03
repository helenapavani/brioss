import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/components/carrinho-compras/Product';
import { environment } from 'src/app/environment/environment-test';

@Injectable({
	providedIn: 'root'
})
export class ProductService {

	constructor(private http: HttpClient) { }

	getProducts(): Observable<Product[]> {
		return this.http.get<Product[]>(`${environment.API_URL}/produtos`)
	}

	getAllProducts(): Observable<Product[]> {
		return this.http.get<Product[]>(`${environment.API_URL}/todos-produtos`)
	}

	cadastrarProduto(dados: any): Observable<any> {
		return this.http.post<any>(`${environment.API_URL}/produto`, dados)
	}
	getAllProdutosDestaque(): Observable<Product[]> {
		return this.http.get<Product[]>(`${environment.API_URL}/produtosDetaques`)
	}

}
