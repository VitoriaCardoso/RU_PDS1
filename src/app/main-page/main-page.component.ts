import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterModule, LogoComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  presencaConfirmada = false;

  confirmarPresenca() {
    this.presencaConfirmada = true;
    alert('Presença confirmada no refeitório com sucesso!');
  }
}
