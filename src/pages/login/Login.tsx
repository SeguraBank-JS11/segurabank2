import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../contexts/AuthContext"
import type UsuarioLogin from "../../models/UsuarioLogin"
import { LogIn } from "lucide-react"

function Login() {

  const navigate = useNavigate()
  const { usuario, handleLogin, isLoading } = useContext(AuthContext)

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  )

  useEffect(() => {
    if (usuario.token !== "") {
      navigate('/home')
    }
  }, [usuario])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    })
  }

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    handleLogin(usuarioLogin)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

      {/* Formulário */}
      <div className="flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200">

          {/* Header */}
          <div className="bg-linear-to-r from-blue-200 to-blue-300 px-6 py-4 flex items-center gap-3 rounded-t-2xl">
            <LogIn className="text-blue-900" size={22} />
            <h1 className="text-xl font-bold text-gray-900">
              Acessar Conta
            </h1>
          </div>

          {/* Form */}
          <form
            onSubmit={login}
            className="p-6 space-y-5"
          >

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                Usuário
              </label>
              <input
                type="text"
                name="usuario"
                placeholder="Digite seu usuário"
                value={usuarioLogin.usuario}
                onChange={atualizarEstado}
                className="input-padrao"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                Senha
              </label>
              <input
                type="password"
                name="senha"
                placeholder="Digite sua senha"
                value={usuarioLogin.senha}
                onChange={atualizarEstado}
                className="input-padrao"
                required
              />
            </div>

            <button
              type="submit"
              className="
                w-full py-3 rounded-xl font-semibold
                bg-blue-800 hover:bg-blue-900 text-white
                flex items-center justify-center transition
              "
            >
              {isLoading
                ? <ClipLoader color="#ffffff" size={22} />
                : 'Entrar'}
            </button>

            <div className="border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
              Ainda não tem uma conta?{' '}
              <Link
                to="/cadastro"
                className="text-blue-900 font-semibold hover:underline"
              >
                Cadastre-se
              </Link>
            </div>

          </form>
        </div>
      </div>

      {/* Imagem lateral */}
      <div
        className="
          hidden lg:block bg-cover bg-center
          bg-[url('https://i.imgur.com/AiBccVG.png')]
        "
      />

      {/* Estilos reutilizáveis */}
      <style>
        {`
          .input-padrao {
            border: 1px solid #d1d5db;
            border-radius: 0.75rem;
            padding: 0.65rem 0.75rem;
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

export default Login
