import { Link } from 'react-router-dom'
import type Categoria from '../../../models/Categoria'
import { Folder, Pencil, Trash2 } from 'lucide-react'

interface CardCategoriaProps {
  categoria: Categoria
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <div
      className="
        bg-white rounded-2xl border border-gray-200
        shadow-sm hover:shadow-lg transition-all duration-300
        flex flex-col overflow-hidden
      "
    >
      {/* Header */}
      <header className="bg-linear-to-r from-blue-100 to-blue-200 px-6 py-4 flex items-center gap-3">
        <Folder className="text-blue-800" size={22} />
        <h2 className="text-lg font-semibold text-gray-900">
          Categoria
        </h2>
      </header>

      {/* Conteúdo */}
      <div className="p-8 flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-2xl font-bold text-gray-900 text-center">
          {categoria.descricao}
        </p>
      </div>

      {/* Ações */}
      <div className="grid grid-cols-2 border-t border-gray-200">
        <Link
          to={`/editarcategoria/${categoria.id}`}
          className="
            flex items-center justify-center gap-2 py-3
            text-blue-800 font-semibold
            hover:bg-blue-100 transition
          "
        >
          <Pencil size={18} />
          Editar
        </Link>

        <Link
          to={`/deletarcategoria/${categoria.id}`}
          className="
            flex items-center justify-center gap-2 py-3
            text-red-700 font-semibold
            hover:bg-red-100 transition
          "
        >
          <Trash2 size={18} />
          Deletar
        </Link>
      </div>
    </div>
  )
}

export default CardCategoria
