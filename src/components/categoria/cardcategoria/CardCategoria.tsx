import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import type Categoria from "../../../models/Categoria";

/**
 * CardCategoria
 *
 * Responsável por exibir:
 * - Nome da categoria
 * - Descrição
 * - Ações: Editar e Deletar
 *
 * Diretriz visual:
 * - Card claro, borda suave, sombra leve
 * - Botões consistentes com a paleta do projeto
 */
interface CardCategoriaProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <article className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">
      {/* Conteúdo */}
      <div className="p-7">
        <h3 className="text-xl font-bold text-gray-900">{categoria.nome}</h3>

        <p className="text-gray-600 mt-3 leading-relaxed">
          {categoria.descricao}
        </p>
      </div>

      {/* Ações */}
      <div className="border-t border-gray-100 grid grid-cols-2">
        <Link
          to={`/categoria/editar/${categoria.id}`}
          className="flex items-center justify-center gap-2 py-3 font-semibold text-bank-blue hover:bg-blue-50 transition"
          aria-label={`Editar categoria ${categoria.nome}`}
          title="Editar"
        >
          <Pencil size={16} />
          Editar
        </Link>

        <Link
          to={`/categoria/deletar/${categoria.id}`}
          className="flex items-center justify-center gap-2 py-3 font-semibold text-red-600 hover:bg-red-50 transition border-l border-gray-100"
          aria-label={`Deletar categoria ${categoria.nome}`}
          title="Deletar"
        >
          <Trash2 size={16} />
          Deletar
        </Link>
      </div>
    </article>
  );
}

export default CardCategoria;
