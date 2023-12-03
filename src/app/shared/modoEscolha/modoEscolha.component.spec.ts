import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModoEscolhaComponent } from './modoEscolha.component';

describe('ModoEscolhaComponent', () => {
	let component: ModoEscolhaComponent;
	let fixture: ComponentFixture<ModoEscolhaComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ModoEscolhaComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ModoEscolhaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
