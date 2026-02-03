import { Link } from "react-router-dom";
import type Categoria from "../../../models/Categoria";

/**
 * CardCategoria
 *
 * Objetivo:
 * - Exibir uma categoria (nome e descrição)
 * - Exibir ações de navegação para:
 *   - Editar
 *   - Deletar
 *
 * Padrão de rotas do projeto (singular), conforme App.tsx:
 * - /categoria/editar/:id
 * - /categoria/deletar/:id
 *
 * Observação:
 * - O Link pode ser estilizado como botão, então não precisamos de <button> dentro dele.
 */
interface CardCategoriaProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <article className="border flex flex-col rounded-2xl overflow-hidden justify-between shadow-sm">
      {/* Cabeçalho do card: nome da categoria */}
      <header className="py-2 px-6 bg-indigo-800 text-white font-bold text-2xl">
        {categoria.nome}
      </header>

      {/* Corpo do card: descrição da categoria */}
      <div className="p-8 text-lg bg-slate-200 h-full">
        <p>{categoria.descricao}</p>
      </div>

      {/* Rodapé do card: botões/ações */}
      <footer className="flex">
        {/* Editar: leva para /categoria/editar/:id */}
        <Link
          to={`/categoria/editar/${categoria.id}`}
          className="w-1/2 text-slate-100 bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2 font-semibold transition-colors"
          aria-label={`Editar categoria ${categoria.nome}`}
          title="Editar"
        >
          Editar
        </Link>

        {/* Deletar: leva para /categoria/deletar/:id */}
        <Link
          to={`/categoria/deletar/${categoria.id}`}
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
