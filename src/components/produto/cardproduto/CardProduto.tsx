import { Link } from 'react-router-dom'
import type Produto from '../../../models/Produto'
import { ShieldCheck, Pencil, Trash2, User } from 'lucide-react'

interface CardProdutosProps {
  produto: Produto
}

function CardProduto({ produto }: CardProdutosProps) {
  return (
    <div
      className="
        bg-white rounded-2xl border border-gray-200
        shadow-sm hover:shadow-xl transition-all duration-300
        flex flex-col overflow-hidden
      "
    >
      {/* Header */}
      <div className="bg-linear-to-r from-blue-100 to-blue-200 px-5 py-4 flex items-center gap-3">
        <div className="bg-white/70 p-2 rounded-lg">
          <User className="text-blue-800" size={20} />
        </div>

        <div className="flex flex-col">
          <span className="text-xs text-gray-600">Responsável</span>
          <h3 className="font-semibold text-gray-900">
            {produto.usuario?.nome}
          </h3>
        </div>

        <ShieldCheck className="ml-auto text-blue-800" size={22} />
      </div>

      {/* Conteúdo */}
      <div className="p-6 space-y-3 flex-1">
        <h4 className="text-xl font-bold text-gray-900">
          {produto.titulo}
        </h4>

        <p className="text-gray-700 text-sm">
          {produto.descricao}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          <span className="bg-blue-200 text-blue-900 text-xs font-semibold px-3 py-1 rounded-full">
            {produto.categoria?.descricao}
          </span>

          <span className="bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
            Ativa
          </span>
        </div>

        <div className="pt-4">
          <p className="text-sm text-gray-600">Valor da Apólice</p>
          <p className="text-2xl font-bold text-gray-900">
            R$ {produto.valor?.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Ações */}
      <div className="grid grid-cols-2 border-t border-gray-200">
        <Link
          to={`/editarproduto/${produto.id}`}
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
          to={`/deletarproduto/${produto.id}`}
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

export default CardProduto
