import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscolherEntregaComponent } from './escolher-entrega.component';

describe('EscolherEntregaComponent', () => {
  let component: EscolherEntregaComponent;
  let fixture: ComponentFixture<EscolherEntregaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EscolherEntregaComponent]
    });
    fixture = TestBed.createComponent(EscolherEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
