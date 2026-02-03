import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import type Usuario from "../../models/Usuario"
import { cadastrarUsuario } from "../../services/Service"
import { ToastAlerta } from "../../utils/ToastAlerta"
import { UserPlus } from "lucide-react"

function Cadastro() {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [confirmarSenha, setConfirmarSenha] = useState<string>("")

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    dataNascimento: new Date(),
    tipo: '',
  })

  useEffect(() => {
    if (usuario.id !== 0) retornar()
  }, [usuario])

  function retornar() {
    navigate('/')
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true)

      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
        ToastAlerta('Usuário cadastrado com sucesso!', 'sucesso')
      } catch {
        ToastAlerta('Erro ao cadastrar o usuário!', 'erro')
      }
    } else {
      ToastAlerta('Dados inconsistentes. Verifique a senha.', 'erro')
      setUsuario({ ...usuario, senha: '' })
      setConfirmarSenha('')
    }

    setIsLoading(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

      {/* Imagem lateral */}
      <div
        className="
          hidden lg:block bg-cover bg-center
          bg-[url('https://i.imgur.com/ZZFAmzo.jpg')]
        "
      />

      {/* Formulário */}
      <div className="flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200">

          {/* Header */}
          <div className="bg-linear-to-r from-blue-200 to-blue-300 px-6 py-4 flex items-center gap-3 rounded-t-2xl">
            <UserPlus className="text-blue-900" size={22} />
            <h1 className="text-xl font-bold text-gray-900">
              Criar Conta
            </h1>
          </div>

          {/* Form */}
          <form
            onSubmit={cadastrarNovoUsuario}
            className="p-6 space-y-4"
          >

            <Input label="Nome" name="nome" value={usuario.nome} onChange={atualizarEstado} />
            <Input label="Usuário" name="usuario" value={usuario.usuario} onChange={atualizarEstado} />
            <Input label="Foto (URL)" name="foto" value={usuario.foto} onChange={atualizarEstado} />
            <Input label="Tipo de Usuário" name="tipo" value={usuario.tipo} onChange={atualizarEstado} />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                Data de Nascimento
              </label>
              <input
                type="date"
                name="dataNascimento"
                className="input-padrao"
                onChange={atualizarEstado}
              />
            </div>

            <Input
              label="Senha"
              name="senha"
              type="password"
              value={usuario.senha}
              onChange={atualizarEstado}
            />

            <Input
              label="Confirmar Senha"
              name="confirmarSenha"
              type="password"
              value={confirmarSenha}
              onChange={handleConfirmarSenha}
            />

            {/* Botões */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={retornar}
                className="
                  w-1/2 py-3 rounded-xl font-semibold
                  bg-red-500 hover:bg-red-700 text-white
                  transition
                "
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="
                  w-1/2 py-3 rounded-xl font-semibold
                  bg-blue-800 hover:bg-blue-900 text-white
                  flex items-center justify-center transition
                "
              >
                {isLoading
                  ? <ClipLoader color="#fff" size={22} />
                  : 'Cadastrar'}
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* Estilos reutilizáveis */}
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

/* Input reutilizável (visual apenas) */
function Input({
  label,
  name,
  value,
  onChange,
  type = 'text'
}: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="input-padrao"
        required
      />
    </div>
  )
}

export default Cadastro
