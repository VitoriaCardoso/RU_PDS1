import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCardapioComponent } from './cardapio';

describe('ConsultaCardapioComponent', () => {
  let component: ConsultaCardapioComponent;
  let fixture: ComponentFixture<ConsultaCardapioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaCardapioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaCardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
