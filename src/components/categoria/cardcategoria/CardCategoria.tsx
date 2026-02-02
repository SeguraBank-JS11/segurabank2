import { Link } from "react-router-dom";
import type Categoria from "../../../models/Categoria";

/**
 * CardCategoria
 *
 * Responsável por exibir:
 * - Nome da categoria
 * - Descrição
 * - Ações: Editar e Deletar
 *
 * Observações:
 * - Evita colocar <button> dentro de <Link> (melhor semântica e acessibilidade).
 * - O Link já é clicável por natureza, então ele vira o "botão" visual via Tailwind.
 */
interface CardCategoriaProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <article className="border flex flex-col rounded-2xl overflow-hidden justify-between shadow-sm">
      {/* Cabeçalho */}
      <header className="py-2 px-6 bg-indigo-800 text-white font-bold text-2xl">
        {categoria.nome}
      </header>

      {/* Corpo */}
      <div className="p-8 text-lg bg-slate-200 h-full">
        <p>{categoria.descricao}</p>
      </div>

      {/* Ações */}
      <footer className="flex">
        <Link
          to={`/editarcategoria/${categoria.id}`}
          className="w-1/2 text-slate-100 bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2 font-semibold transition-colors"
          aria-label={`Editar categoria ${categoria.nome}`}
          title="Editar"
        >
          Editar
        </Link>

        <Link
          to={`/deletarcategoria/${categoria.id}`}
          className="w-1/2 text-slate-100 bg-red-400 hover:bg-red-700 flex items-center justify-center py-2 font-semibold transition-colors"
          aria-label={`Deletar categoria ${categoria.nome}`}
          title="Deletar"
        >
          Deletar
        </Link>
      </footer>
    </article>
  );
}

export default CardCategoria;
