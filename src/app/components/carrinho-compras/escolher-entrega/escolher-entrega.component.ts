import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StoreService } from '../../core/services/carrinho/store.service';
import { ModoEntrega } from 'src/app/shared/modoEscolha/modoEscolha.component';

@Component({
	selector: 'app-escolher-entrega',
	templateUrl: './escolher-entrega.component.html',
	styleUrls: ['./escolher-entrega.component.scss'],
})
export class EscolherEntregaComponent implements OnInit {
	@Output() mudarStep = new EventEmitter();
	@Input() steps!: any
	private destroy$ = new Subject<void>();
	modoEntrega!: string;

	step = { 3: false, 4: false };
	selectDiaSemana!: number;

	selectHorario!: number;
	dias: IDias[] = [
		{ id: 1, name: 'Domingo' },
		{ id: 2, name: 'Segunda-feira' },
		{ id: 3, name: 'Terça-feira' },
		{ id: 4, name: 'Quarta-feira' },
		{ id: 5, name: 'Quinta-feira' },
		{ id: 6, name: 'Sexta-feira' },
		{ id: 7, name: 'Sabado' },
	];

	horarios: IHorario[] = [
		{ id: 1, hora: '10h' },
		{ id: 2, hora: '11h' },
		{ id: 3, hora: '17h' },
	];

	constructor(private storeService: StoreService) {

		this.storeService.getTipoEntrega$()
			.pipe(takeUntil(this.destroy$))
			.subscribe(tipoEntrega => {

				this.modoEntrega = tipoEntrega.tipo
			});
	}
	ngOnInit(): void {

	}
}

interface IDias {
	id: number;
	name: string;
}

interface IHorario {
	id: number;
	hora: string;
}
