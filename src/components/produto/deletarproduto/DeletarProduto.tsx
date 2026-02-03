import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Produto from "../../../models/Produto"
import { buscar, deletar } from "../../../services/Service"
import { ClipLoader } from "react-spinners"
import { ToastAlerta } from "../../../utils/ToastAlerta"
import { AlertTriangle, ShieldCheck } from "lucide-react"

function DeletarProduto() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [produto, setProduto] = useState<Produto>({} as Produto)

  const { id } = useParams<{ id: string }>()

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarPorId(id: string) {
    try {
      await buscar(`/apolices/${id}`, setProduto, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'info')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  async function deletarProduto() {
    setIsLoading(true)

    try {
      await deletar(`/apolices/${id}`, {
        headers: { Authorization: token }
      })

      ToastAlerta('Apólice apagada com sucesso', 'sucesso')
      retornar()

    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      } else {
        ToastAlerta('Erro ao deletar a apólice.', 'erro')
      }
    } finally {
      setIsLoading(false)
    }
  }

  function retornar() {
    navigate("/produtos")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div
        className="
          w-full max-w-md bg-white
          rounded-2xl border border-gray-200
          shadow-lg overflow-hidden
        "
      >
        {/* Header */}
        <header className="bg-linear-to-r from-blue-200 to-blue-300 px-6 py-4 flex items-center gap-3">
          <AlertTriangle className="text-red-600" size={24} />
          <h1 className="text-xl font-bold text-gray-900">
            Confirmar exclusão
          </h1>
        </header>

        {/* Conteúdo */}
        <div className="p-6 space-y-4">
          <p className="text-gray-700">
            Você tem certeza que deseja apagar a apólice abaixo?
          </p>

          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="text-blue-800" size={18} />
              <span className="text-sm text-gray-600">Apólice</span>
            </div>

            <p className="text-lg font-semibold text-gray-900">
              {produto.titulo}
            </p>

            <p className="text-sm text-gray-600 mt-1">
              {produto.descricao}
            </p>
          </div>

          <p className="text-sm text-red-600 font-medium">
            ⚠️ Esta ação não poderá ser desfeita.
          </p>
        </div>

        {/* Ações */}
        <div className="grid grid-cols-2 border-t border-gray-200">
          <button
            onClick={retornar}
            className="
              py-3 font-semibold text-gray-700
              hover:bg-gray-100 transition
            "
          >
            Cancelar
          </button>

          <button
            onClick={deletarProduto}
            className="
              py-3 font-semibold text-white
              bg-red-600 hover:bg-red-700
              flex items-center justify-center
              transition
            "
          >
            {isLoading
              ? <ClipLoader color="#ffffff" size={20} />
              : 'Excluir'
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarProduto
