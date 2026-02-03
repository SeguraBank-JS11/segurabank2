import type Categoria from "./Categoria";
import type Usuario from "./Usuario";

export default interface Produto {
  id: number;
  titulo: string;
  valor: number;
  status: boolean;
<<<<<<< HEAD
  senha: string;
  produto?: Produto[] | null;
=======
  descricao: string;
  categoria: Categoria | null;
  usuario: Usuario | null;
  // categoria:number;
  // usuario: number;
>>>>>>> dev
}