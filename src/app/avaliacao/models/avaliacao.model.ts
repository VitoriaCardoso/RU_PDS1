import { LoginModel } from '../../login/models/login.model'; 

export interface AvaliacaoModel {
  id: number;
  nota: number;
  comentarios: string;
  usuario: number;
}