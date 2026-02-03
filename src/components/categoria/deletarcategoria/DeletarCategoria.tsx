import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import type Categoria from "../../../models/Categoria"
import { buscar, deletar } from "../../../services/Service"
import { ToastAlerta } from "../../../utils/ToastAlerta"
import { AlertTriangle, Folder } from "lucide-react"

function DeletarCategoria() {

  const navigate = useNavigate()

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const { id } = useParams<{ id: string }>()

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categoria/${id}`, setCategoria, {
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

  async function deletarCategoria() {
    setIsLoading(true)

    try {
      await deletar(`/categoria/${id}`, {
        headers: { Authorization: token }
      })

      ToastAlerta('Categoria deletada com sucesso', 'sucesso')
      retornar()

    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      } else {
        ToastAlerta('Erro ao deletar a categoria.', 'erro')
      }
    } finally {
      setIsLoading(false)
    }
  }

  function retornar() {
    navigate("/categoria")
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
          <AlertTriangle className="text-red-600" size={22} />
          <h1 className="text-xl font-bold text-gray-900">
            Confirmar exclusão
          </h1>
        </header>

        {/* Conteúdo */}
        <div className="p-6 space-y-4">
          <p className="text-gray-700">
            Você tem certeza que deseja apagar a categoria abaixo?
          </p>

          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <Folder className="text-blue-800" size={18} />
              <span className="text-sm text-gray-600">Categoria</span>
            </div>

            <p className="text-lg font-semibold text-gray-900">
              {categoria.descricao}
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
            onClick={deletarCategoria}
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

export default DeletarCategoria
