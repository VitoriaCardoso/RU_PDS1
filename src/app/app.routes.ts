import { Routes } from '@angular/router';
import { ConsultaAvaliacaoComponent } from './avaliacao/avaliacao.component';
import { ConsultaCardapioComponent } from './cardapio/cardapio';
import { ConsultaGraficoComponent } from './grafico/grafico.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PaginaNotFoundComponent } from './pagina-not-found/pagina-not-found.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { UsuarioComponent } from './usuario/usuario.component';

export const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: MainPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent},
    { path: 'avaliacao', title: 'Avaliação', component: ConsultaAvaliacaoComponent },
    { path: 'cardapio', title: 'Cardápio', component: ConsultaCardapioComponent },
    { path: 'grafico', title: 'Gráfico', component: ConsultaGraficoComponent },
    { path: 'cadastro/editar_usuario', component: UsuarioComponent},
    { path: '**', component: PaginaNotFoundComponent}
];
