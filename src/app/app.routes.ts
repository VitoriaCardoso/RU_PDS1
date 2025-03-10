import { Routes } from '@angular/router';
import { ConsultaRelatoriosComponent } from './consulta-relatorios/consulta-relatorios.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PaginaNotFoundComponent } from './pagina-not-found/pagina-not-found.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: MainPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'consulta-relatorios', title: 'Relatórios', component: ConsultaRelatoriosComponent },
    { path: '**', component: PaginaNotFoundComponent}
];
