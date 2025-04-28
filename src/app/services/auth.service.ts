import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInStatusSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  loggedInStatus$ = this.loggedInStatusSubject.asObservable();

  constructor() {}

  checkLoginStatus(): boolean {
    return !!localStorage.getItem('id');
  }

  setLoginStatus(status: boolean): void {
    if (status) {
      localStorage.setItem('id', 'some-id');
    } else {
      localStorage.removeItem('id');
      // localStorage.removeItem('votoFeito');  // Remove o estado de voto ao deslogar
    }
    this.loggedInStatusSubject.next(status);
  }

  getAlunoId(): number | null{
    const alunoId = localStorage.getItem('id');
  console.log('Valor de id no localStorage:', alunoId); // Verifique o valor antes da conversão
  if (alunoId && !isNaN(Number(alunoId))) {
    return parseInt(alunoId, 10); // Converte para número e retorna
  }
  return null; // Retorna null se não encontrar o alunoId
  }

  login(usuario: string, senha: string): boolean {

    const alunoId = 1; // Substitua por uma resposta real do backend
    console.log('Armazenando alunoId no localStorage:', alunoId);
    localStorage.setItem('id', alunoId.toString()); // Armazenando o ID real do aluno

    this.setLoginStatus(true);
    return true; 
  }

  // Método de logout
  logout(): void {
    //localStorage.removeItem('votoFeito');  // Remove o estado de voto ao deslogar
    this.setLoginStatus(false); // Define o status como false e remove o 'id' do localStorage
  }

}


