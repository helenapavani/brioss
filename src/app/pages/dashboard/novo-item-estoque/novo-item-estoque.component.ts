import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EstoqueComponent } from '../estoque/estoque.component';
import { ProductService } from 'src/app/components/core/services/product/product.service';
import { Subscription } from 'rxjs';
import { ImageUploaderService } from 'src/app/components/core/services/imageUploader/image-uploader.service';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-novo-item-estoque',
	templateUrl: './novo-item-estoque.component.html',
	styleUrls: ['./novo-item-estoque.component.scss']
})
export class NovoItemEstoqueComponent implements OnInit {
	nomeProduto = ""
	preco = 0
	descricao = ''
	status = false
	estoqueDisponivel = 0
	productUrl = ''
	isDestaque: boolean = false

	quantidade = 0

	categorias: any = [
		{
			full: "Doces",
			short: "DC"
		},
		{
			full: "Salgados",
			short: "SLG"
		},
		{
			full: "Bebidas Frias",
			short: "BF"
		},
		{
			full: "Bebidas Quentes",
			short: "BQS"
		},
	];

	selected: string = "DC";
	selectedCategory = new FormControl(this.selected);

	private readonly sub$ = new Subscription();

	constructor(
		public dialogRef: MatDialogRef<EstoqueComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private productService: ProductService,
		private imageUploadService: ImageUploaderService
	) { }

	ngOnInit() {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	onFileSelected(event: any) {
		const selectedFile = event.target.files[0];
		this.uploadImage(selectedFile);
	}

	uploadImage(file: File) {
		if (file) {
			this.imageUploadService.uploadImage(file)
				.then(imageUrl => {
					this.productUrl = imageUrl
					console.log('URL da imagem:', imageUrl);
				})
				.catch(error => {
					console.error('Erro ao fazer upload da imagem:', error);
				});
		}
	}

	diminuirQuantidade() { }

	cadastrarProduto() {

		const dados = {
			estoqueDisponivel: this.estoqueDisponivel,
			nomeProduto: this.nomeProduto,
			preco: this.preco,
			status: this.status,
			descricao: this.descricao,
			imageUrl: this.productUrl ?? "",
			ativo: true,
			categoria: this.selectedCategory.value,
			isDestaque: this.isDestaque
		}

		const sub = this.productService.cadastrarProduto(dados)
			.subscribe(() => {
				this.dialogRef.close();
			}, (error) => alert('Deu erro'))

		this.sub$.add(sub)
	}

	mudarStatus(valor: boolean): void {
		this.status = valor
	}

	escolherQuantidade(ev: any) {
		this.estoqueDisponivel = ev
	}

}
