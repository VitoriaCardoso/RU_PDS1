import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaGraficoComponent } from './grafico.component';

describe('ConsultaGraficoComponent', () => {
  let component: ConsultaGraficoComponent;
  let fixture: ComponentFixture<ConsultaGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaGraficoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
