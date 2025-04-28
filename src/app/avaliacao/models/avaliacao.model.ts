import { LoginModel } from '../../login/models/login.model'; 

export interface AvaliacaoModel {
  id: number;
  nota: number;
  comentario: string;
  usuario_matric: string;
}