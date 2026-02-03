import type Categoria from "./Categoria";
import type Usuario from "./Usuario";

export default interface Produto {
  id: number;
  titulo: string;
  valor: number;
  status: boolean;
  descricao: string;
  categoria: Categoria | null;
  usuario: Usuario | null;
  // categoria:number;
  // usuario: number;
}