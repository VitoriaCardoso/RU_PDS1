import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core'
import { LogoComponent } from '../logo/logo.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';  // Importe o AuthService

@Component({
  selector: 'app-header',
  imports: [LogoComponent, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loggedInStatus$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  logout(): void {
    this.authService.setLoginStatus(false);  // Atualiza o status de login através do serviço
    this.router.navigate(['/login']);
  }
}
