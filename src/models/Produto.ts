import type Categoria from "./Categoria";
import type Usuario from "./Usuario";

export default interface Produto {
  id: number;
  nome: string;
  usuario: string;
  foto: string;
  senha: string;
  postagem?: Produto[] | null;
}