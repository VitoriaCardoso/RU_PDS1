import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common'; 
import { ConsultaCardapioComponent } from './cardapio';

describe('ConsultaCardapioComponent', () => {
  let component: ConsultaCardapioComponent;
  let fixture: ComponentFixture<ConsultaCardapioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [ConsultaCardapioComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaCardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
