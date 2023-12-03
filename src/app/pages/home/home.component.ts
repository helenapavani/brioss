import { Product } from 'src/app/components/carrinho-compras/Product';
import { ProductService } from './../../components/core/services/product/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, catchError, of, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
	products: Product[] = []
	productsDestaque: Product[] = []
	private stop$ = new Subject<void>();
	groupProducts!: any;


	constructor(private productService: ProductService) {
	}
	ngOnDestroy(): void {
		this.stop$.next()
		this.stop$.complete()
	}

	ngOnInit(): void {
		this.getAllProducts();
		this.getAllProductDestaque()
	}

	private getAllProductDestaque() {
		this.productService.getAllProdutosDestaque().subscribe(products => this.productsDestaque = products);
	}
	// private getAllProducts() {
	// 	this.productService.getProducts()
	// 		.pipe(takeUntil(this.stop$))
	// 		.subscribe({
	// 			next: (response: Product[]) => {
	// 				this.products = response;
	// 			},
	// 			error: (err) => {
	// 				console.error('Error: ' + err);
	// 			},
	// 		});
	// }

	private getAllProducts() {
		this.productService.getProducts()
			.pipe(takeUntil(this.stop$))
			.subscribe({
				next: (response: any[]) => {
					const productsByCategory: { [key: string]: any[] } = {};

					response.forEach(product => {
						const category = product.categoria;

						if (!productsByCategory[category]) {
							productsByCategory[category] = [];
						}

						productsByCategory[category].push(product.produtos);
					});

					this.groupProducts = productsByCategory;
					console.log("🚀 ~ f~ groupProducts:", this.groupProducts)

				},
				error: (err) => {
					Swal.fire('Ocorreu um erro ao buscar categorias do cardápio.')
				},
			});
	}





}
