import { Subscription, catchError, of, take, timeout } from 'rxjs';
import { Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { StoreService } from '../../core/services/carrinho/store.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-cupom-desconto',
	templateUrl: './cupom-desconto.component.html',
	styleUrls: ['./cupom-desconto.component.scss'],
})
export class CupomDescontoComponent implements OnDestroy {
	@ViewChild('desabilitar', { static: true }) desabilitar!: ElementRef;
	@Output() cupom = new EventEmitter();
	typingTimer: any
	private readonly sub$ = new Subscription();
	valor: string = '';

	constructor(private storeService: StoreService) { }

	ngOnDestroy(): void {
		this.sub$.unsubscribe()
	}

	onInputKeyUp() {
		clearTimeout(this.typingTimer);

		this.typingTimer = setTimeout(() => {
			this.validarCupom(this.valor);
		}, 3000);
	}

	validarCupom(valor: string) {
		if (valor.length < 1)
			return

		const valorToUpper = valor.toUpperCase()

		const sub = this.storeService.checkCupom(valorToUpper)
			.pipe(
				take(1),
				catchError(() => {
					Swal.fire("Código do cupom invalido", "", "error")
					return of(null)
				})
			)
			.subscribe({
				next: (res) => {
					if (res) {
						this.cupom.next(res);
					}
				},
			});
		this.sub$.add(sub);
	}

	private desabilitarBotao() {
		this.desabilitar.nativeElement.disabled = true;
	}
}
