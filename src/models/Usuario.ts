import type Produto from "./Produto";

export default interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  dataNascimento: Date;
  foto: string;
  tipo: string;
  produto?: Produto[] | null;
}