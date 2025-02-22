import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaRelatoriosComponent } from './consulta-relatorios.component';

describe('ConsultaRelatoriosComponent', () => {
  let component: ConsultaRelatoriosComponent;
  let fixture: ComponentFixture<ConsultaRelatoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaRelatoriosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaRelatoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
