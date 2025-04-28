import { Component, Input } from '@angular/core';

@Component({
  selector: 'logo',
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css'
})
export class LogoComponent {
  @Input() width: number = 100;
}
