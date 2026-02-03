import {
  useContext,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { atualizar, buscar, cadastrar, authHeader } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

/**
 * FormCategoria
 *
 * Responsável por:
 * - Cadastrar nova categoria
 * - Editar categoria existente
 *
 * Regras:
 * - Se existir id na rota, entra em modo edição
 * - Se não existir id, entra em modo cadastro
 * - Suporta VITE_SKIP_AUTH=true para testes visuais
 *
 * Diretriz visual:
 * - Manter o padrão do Home:
 *   - fundo leve em degradê
 *   - card branco com borda suave
 *   - CTA bank-blue com hover
 */
function FormCategoria() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: "",
    descricao: ""
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const skipAuth = String(import.meta.env.VITE_SKIP_AUTH) === "true";

  const avisouRef = useRef(false);

  /**
   * Proteção de rota
   */
  useEffect(() => {
    if (skipAuth) return;

    if (!token && !avisouRef.current) {
      avisouRef.current = true;
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token, navigate, skipAuth]);

  /**
   * Se existir id, busca a categoria para edição
   */
  useEffect(() => {
    if (!id) return;

    if (skipAuth && !token) {
      setCategoria({
        id: Number(id),
        nome: "Categoria Mock",
        descricao: "Edição apenas visual em modo desenvolvimento"
      });
      return;
    }

    buscarPorId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function buscarPorId(idParam: string) {
    try {
      await buscar(`/categoria/${idParam}`, setCategoria, authHeader(token));
    } catch (error: any) {
      if (error?.toString()?.includes("401")) {
        handleLogout();
        ToastAlerta("Sessão expirada. Faça login novamente.", "info");
        navigate("/");
      } else {
        ToastAlerta("Erro ao buscar categoria.", "erro");
      }
    }
  }

  /**
   * Atualiza estado conforme digitação
   */
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    });
  }

  /**
   * Retorna para a listagem (rota no singular)
   */
  function retornar() {
    navigate("/categoria");
  }

  /**
   * Salvar categoria (POST ou PUT)
   */
  async function salvarCategoria(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (skipAuth && !token) {
      ToastAlerta("Ação simulada em modo desenvolvimento.", "info");
      retornar();
      return;
    }

    setIsLoading(true);

    try {
      if (id) {
        await atualizar("/categoria", categoria, setCategoria, authHeader(token));
        ToastAlerta("Categoria atualizada com sucesso!", "sucesso");
      } else {
        await cadastrar("/categoria", categoria, setCategoria, authHeader(token));
        ToastAlerta("Categoria cadastrada com sucesso!", "sucesso");
      }

      retornar();
    } catch (error: any) {
      if (error?.toString()?.includes("401")) {
        handleLogout();
        ToastAlerta("Sessão expirada. Faça login novamente.", "info");
        navigate("/");
      } else {
        ToastAlerta("Erro ao salvar categoria.", "erro");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fundo padrão do Home */}
      <section className="bg-linear-to-br from-gray-50 to-blue-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho */}
          <div className="mb-10">
            <span className="inline-block bg-blue-100 text-bank-blue px-4 py-1 rounded-full text-sm font-semibold">
              Gestão
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              {id ? "Editar Categoria" : "Cadastrar Categoria"}
            </h1>

            <p className="text-gray-600 mt-2">
              Preencha os dados abaixo para {id ? "atualizar" : "criar"} uma categoria.
            </p>
          </div>

          {/* Card do formulário */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 md:p-10 max-w-2xl">
            <form className="flex flex-col gap-5" onSubmit={salvarCategoria}>
              <div className="flex flex-col gap-2">
                <label htmlFor="nome" className="text-sm font-semibold text-gray-800">
                  Nome
                </label>
                <input
                  id="nome"
                  type="text"
                  name="nome"
                  value={categoria.nome}
                  onChange={atualizarEstado}
                  className="border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Digite o nome da categoria"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="descricao" className="text-sm font-semibold text-gray-800">
                  Descrição
                </label>
                <input
                  id="descricao"
                  type="text"
                  name="descricao"
                  value={categoria.descricao}
                  onChange={atualizarEstado}
                  className="border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Digite a descrição"
                />
              </div>

              {/* Ações */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-bank-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-800 transition flex items-center justify-center"
                >
                  {isLoading ? <ClipLoader size={20} color="#ffffff" /> : id ? "Atualizar" : "Cadastrar"}
                </button>

                <button
                  type="button"
                  onClick={retornar}
                  className="bg-white text-bank-blue border border-gray-200 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FormCategoria;
