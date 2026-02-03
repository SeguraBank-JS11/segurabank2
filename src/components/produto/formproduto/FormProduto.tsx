import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import type Produto from "../../../models/Produto"
import type Categoria from "../../../models/Categoria"
import { atualizar, buscar, cadastrar } from "../../../services/Service"
import { ToastAlerta } from "../../../utils/ToastAlerta"
import { FileText, Tag } from "lucide-react"

function FormProduto() {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [categoria, setCategoria] = useState<Categoria>({ id: 0, nome: '', descricao: '' })
  const [produto, setProduto] = useState<Produto>({} as Produto)

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const { id } = useParams<{ id: string }>()

  async function buscarProdutoPorId(id: string) {
    try {
      await buscar(`/apolices/${id}`, setProduto, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('401')) handleLogout()
    }
  }

  async function buscarCategoriaPorId(id: string) {
    try {
      await buscar(`/categoria/${id}`, setCategoria, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('401')) handleLogout()
    }
  }

  async function buscarCategorias() {
    try {
      await buscar('/categoria', setCategorias, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('401')) handleLogout()
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'info')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    buscarCategorias()
    if (id !== undefined) buscarProdutoPorId(id)
  }, [id])

  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoria,
    })
  }, [categoria])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
      categoria: categoria,
      usuario: usuario,
    })
  }

  function retornar() {
    navigate('/produtos')
  }

  async function gerarNovaProduto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (id !== undefined) {
        await atualizar(`/apolices`, produto, setProduto, {
          headers: { Authorization: token }
        })
        ToastAlerta('Apólice atualizada com sucesso', 'sucesso')
      } else {
        await cadastrar(`/apolices`, produto, setProduto, {
          headers: { Authorization: token }
        })
        ToastAlerta('Produto cadastrada com sucesso', 'sucesso')
      }
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      } else {
        ToastAlerta('Erro ao salvar a Apólice', 'erro')
      }
    }

    setIsLoading(false)
    retornar()
  }

  const carregandoCategoria = categoria.descricao === ''
  produto.status = true

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <header className="bg-linear-to-r from-blue-200 to-blue-300 px-6 py-4 flex items-center gap-3">
          <FileText className="text-blue-900" size={22} />
          <h1 className="text-xl font-bold text-gray-900">
            {id !== undefined ? 'Editar Apólice' : 'Cadastrar Apólice'}
          </h1>
        </header>

        {/* Form */}
        <form onSubmit={gerarNovaProduto} className="p-6 space-y-5">

          {/* Título */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Título da Apólice
            </label>
            <input
              type="text"
              name="titulo"
              required
              placeholder="Ex: Seguro Residencial Premium"
              className="input-padrao"
              value={produto.titulo}
              onChange={atualizarEstado}
            />
          </div>

          {/* Valor */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Valor da Apólice
            </label>
            <input
              type="number"
              name="valor"
              required
              placeholder="Valor contratado"
              className="input-padrao"
              value={produto.valor}
              onChange={atualizarEstado}
            />
          </div>

          {/* Descrição */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Descrição
            </label>
            <input
              type="text"
              name="descricao"
              required
              placeholder="Descrição da apólice"
              className="input-padrao"
              value={produto.descricao}
              onChange={atualizarEstado}
            />
          </div>

          {/* Categoria */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <Tag size={16} />
              Categoria
            </label>
            <select
              className="input-padrao"
              onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
            >
              <option value="" disabled selected>
                Selecione uma categoria
              </option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.descricao}
                </option>
              ))}
            </select>
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={carregandoCategoria}
            className="
              w-full mt-4 py-3 rounded-xl font-semibold text-white
              bg-blue-800 hover:bg-blue-900
              disabled:bg-gray-300
              flex items-center justify-center
              transition
            "
          >
            {isLoading
              ? <ClipLoader color="#ffffff" size={22} />
              : id === undefined ? 'Cadastrar Apólice' : 'Atualizar Apólice'}
          </button>
        </form>
      </div>

      {/* Input padrão reutilizável */}
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

export default FormProduto
