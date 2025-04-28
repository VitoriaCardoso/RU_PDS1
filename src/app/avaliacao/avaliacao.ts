import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAvaliacaoComponent } from './avaliacao.component';

describe('ConsultaAvaliacaoComponent', () => {
  let component: ConsultaAvaliacaoComponent;
  let fixture: ComponentFixture<ConsultaAvaliacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaAvaliacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaAvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
