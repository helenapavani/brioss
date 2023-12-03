import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecoInformacoesComponent } from './preco-informacoes.component';

describe('PrecoInformacoesComponent', () => {
	let component: PrecoInformacoesComponent;
	let fixture: ComponentFixture<PrecoInformacoesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PrecoInformacoesComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PrecoInformacoesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
