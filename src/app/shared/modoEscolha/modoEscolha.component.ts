import { StoreService } from 'src/app/components/core/services/carrinho/store.service';
import { Component, Input, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-modo-escolha',
	templateUrl: './modoEscolha.component.html',
	styleUrls: ['./modoEscolha.component.scss']
})
export class ModoEscolhaComponent implements OnDestroy {
	modoEntrega!: ModoEntrega;
	private destroy$ = new Subject<void>();

	constructor(private storeService: StoreService) {
		this.storeService.getTipoEntrega$()
			.pipe(takeUntil(this.destroy$))
			.subscribe(tipoEntrega => this.modoEntrega = tipoEntrega);
	}
	ngOnDestroy(): void {
		this.destroy$.next()
		this.destroy$.complete();
	}

	escolheModoEntrega(tipo: string) {
		this.modoEntrega = { tipo, valor: (tipo === "local") ? 0 : 8 };
		this.storeService.setTipoEntrega$(this.modoEntrega);
	}
}

export interface ModoEntrega {
	tipo: string;
	valor: number;
}
