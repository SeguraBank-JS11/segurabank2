import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import type Categoria from "../../../models/Categoria"
import { atualizar, buscar, cadastrar } from "../../../services/Service"
import { ToastAlerta } from "../../../utils/ToastAlerta"
import { Layers } from "lucide-react"

function FormCategoria() {

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
      if (error.toString().includes('401')) handleLogout()
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado!', 'info')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) buscarPorId(id)
  }, [id])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    })
  }

  function retornar() {
    navigate("/categoria")
  }

  async function gerarNovoCategoria(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (id !== undefined) {
        await atualizar(`/categoria`, categoria, setCategoria, {
          headers: { Authorization: token }
        })
        ToastAlerta('Categoria atualizada com sucesso!', 'sucesso')
      } else {
        await cadastrar(`/categoria`, categoria, setCategoria, {
          headers: { Authorization: token }
        })
        ToastAlerta('Categoria cadastrada com sucesso!', 'sucesso')
      }
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      } else {
        ToastAlerta('Erro ao salvar a categoria.', 'erro')
      }
    }

    setIsLoading(false)
    retornar()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

        {/* Header */}
        <header className="bg-linear-to-r from-blue-200 to-blue-300 px-6 py-4 flex items-center gap-3">
          <Layers className="text-blue-900" size={22} />
          <h1 className="text-xl font-bold text-gray-900">
            {id === undefined ? 'Cadastrar Categoria' : 'Editar Categoria'}
          </h1>
        </header>

        {/* Form */}
        <form onSubmit={gerarNovoCategoria} className="p-6 space-y-5">

          {/* Nome */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Nome da Categoria
            </label>
            <input
              type="text"
              name="nome"
              placeholder="Ex: Seguro Residencial"
              className="input-padrao"
              value={categoria.nome}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Descrição */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Descrição da Categoria
            </label>
            <input
              type="text"
              name="descricao"
              placeholder="Descrição detalhada da categoria"
              className="input-padrao"
              value={categoria.descricao}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="
              w-full mt-4 py-3 rounded-xl font-semibold text-white
              bg-blue-800 hover:bg-blue-900
              flex items-center justify-center
              transition
            "
          >
            {isLoading
              ? <ClipLoader color="#ffffff" size={22} />
              : id === undefined ? 'Cadastrar Categoria' : 'Atualizar Categoria'}
          </button>

        </form>
      </div>

      {/* Estilo reutilizável */}
      <style>
        {`
          .input-padrao {
            border: 1px solid #d1d5db;
            border-radius: 0.75rem;
            padding: 0.6rem 0.75rem;
            transition: border-color 0.2s, box-shadow 0.2s;
          }
          .input-padrao:focus {
            outline: none;
            border-color: #1e3a8a;
            box-shadow: 0 0 0 2px rgba(30, 58, 138, 0.15);
          }
        `}
      </style>
    </div>
  )
}

export default FormCategoria
