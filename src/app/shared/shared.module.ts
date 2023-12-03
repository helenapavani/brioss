import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCardComponent } from './list-card/list-card.component';
import { FormsModule } from '@angular/forms';
import { ModoEscolhaComponent } from './modoEscolha/modoEscolha.component';
import { CartaoCreditoComponent } from './cartaoCredito/cartaoCredito.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CardBigDetailsComponent } from './card-big-details/card-big-details.component';



@NgModule({
	declarations: [
		ListCardComponent,
		ModoEscolhaComponent,
		CartaoCreditoComponent,
		CardDetailsComponent,
		CardBigDetailsComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		AngularSvgIconModule.forRoot()
	],
	exports: [
		ListCardComponent,
		ModoEscolhaComponent,
		CartaoCreditoComponent,
		CardDetailsComponent,
		CardBigDetailsComponent
	]
})
export class SharedModule { }
