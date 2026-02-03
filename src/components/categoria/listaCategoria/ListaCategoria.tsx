import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { Plus } from "lucide-react";

import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { buscar, authHeader } from "../../../services/Service";
import CardCategoria from "../cardcategoria/CardCategoria";
import { ToastAlerta } from "../../../utils/ToastAlerta";

/**
 * ListaCategorias
 *
 * Objetivo:
 * - Exibir a listagem de categorias do sistema
 * - Consumir o endpoint GET /categoria
 *
 * Regras de autenticação:
 * - Se VITE_SKIP_AUTH=true:
 *   - Permite visualizar a tela sem login (modo desenvolvimento)
 *   - Caso a API retorne 401, utiliza MOCK local apenas para UI
 *
 * - Se VITE_SKIP_AUTH=false:
 *   - Exige token válido
 *   - Protege a rota e redireciona para "/" se não autenticado
 *
 * Observação sobre React 18:
 * - Em dev com StrictMode, effects rodam 2x.
 * - Usamos refs para evitar chamadas duplicadas e múltiplos toasts.
 */
function ListaCategorias() {
  const navigate = useNavigate();

  /**
   * Estado de loading para controle do spinner
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Estado que armazena a lista de categorias
   */
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  /**
   * Contexto de autenticação
   */
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  /**
   * Flag de ambiente para desenvolvimento sem autenticação
   * Definida no arquivo .env:
   * VITE_SKIP_AUTH=true
   */
  const skipAuth = String(import.meta.env.VITE_SKIP_AUTH) === "true";

  /**
   * Refs para evitar efeitos duplicados em dev (StrictMode)
   */
  const avisouSemTokenRef = useRef(false);
  const fezFetchRef = useRef(false);

  /**
   * MOCK local de categorias
   *
   * Utilizado apenas quando:
   * - skipAuth=true
   * - backend exige autenticação e retorna 401
   *
   * Serve exclusivamente para visualização da UI.
   */
  const MOCK_CATEGORIAS: Categoria[] = [
    {
      id: 1,
      nome: "Seguro Vida",
      descricao: "Planos de seguro de vida e proteção familiar",
      apolice: []
    },
    {
      id: 2,
      nome: "Categoria Teste",
      descricao: "Teste de integração",
      apolice: []
    }
  ];

  /**
   * 1) Proteção de rota
   *
   * Executa apenas quando skipAuth=false.
   * Caso não exista token, exibe alerta e redireciona.
   */
  useEffect(() => {
    if (skipAuth) return;

    if (!token && !avisouSemTokenRef.current) {
      avisouSemTokenRef.current = true;
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token, navigate, skipAuth]);

  /**
   * 2) Buscar categorias
   *
   * Estratégia:
   * - Evita chamadas duplicadas em StrictMode
   * - Em skipAuth=true sem token, exibe mock
   * - Caso contrário, tenta buscar da API
   */
  useEffect(() => {
    if (fezFetchRef.current) return;

    if (skipAuth && !token) {
      fezFetchRef.current = true;
      setCategorias(MOCK_CATEGORIAS);
      return;
    }

    if (!skipAuth && !token) return;

    fezFetchRef.current = true;
    buscarCategorias();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, skipAuth]);

  /**
   * Função responsável por buscar categorias no backend
   */
  async function buscarCategorias() {
    try {
      setIsLoading(true);

      /**
       * Header:
       * - Com token: Authorization Bearer
       * - Sem token (skipAuth): objeto vazio
       */
      const header = token ? authHeader(token) : {};

      await buscar("/categoria", setCategorias, header);
    } catch (error: any) {
      const msg = error?.toString?.() ?? "";

      /**
       * Tratamento de erro 401
       */
      if (msg.includes("401")) {
        if (!skipAuth) {
          handleLogout();
          ToastAlerta("Sessão expirada. Faça login novamente.", "info");
          navigate("/");
        } else {
          ToastAlerta(
            "API pediu login (401). Mostrando mock apenas para visualização.",
            "info"
          );
          setCategorias(MOCK_CATEGORIAS);
        }
        return;
      }

      ToastAlerta("Erro ao listar categorias.", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero leve no estilo do Home */}
      <section className="bg-linear-to-br from-gray-50 to-blue-50 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho + CTA */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <span className="inline-block bg-blue-100 text-bank-blue px-4 py-1 rounded-full text-sm font-semibold">
                Gestão
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Categorias do <span className="text-bank-blue">SeguraBank</span>
              </h1>

              <p className="text-gray-600 max-w-2xl">
                Crie e gerencie categorias para organizar os seguros do sistema com clareza e consistência visual.
              </p>
            </div>

            {/* CTA principal, mesmo padrão do Home */}
            <button
              type="button"
              onClick={() => navigate("/categoria/cadastrar")}
              className="inline-flex items-center justify-center gap-2
                         bg-bank-blue text-white px-7 py-3 rounded-xl
                         font-semibold hover:bg-blue-800 transition"
            >
              <Plus size={18} />
              Criar Categoria
            </button>
          </div>

          {/* Loader */}
          {isLoading && (
            <div className="flex justify-center w-full mt-10">
              <SyncLoader color="#1E3A8A" size={14} />
            </div>
          )}

          {/* Estado vazio */}
          {!isLoading && categorias.length === 0 && (
            <div className="mt-10 bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm">
              <p className="text-xl font-semibold text-gray-900">
                Nenhuma categoria foi encontrada.
              </p>
              <p className="text-gray-600 mt-2">
                Clique em Criar Categoria para cadastrar a primeira.
              </p>
            </div>
          )}

          {/* Grid de cards */}
          {!isLoading && categorias.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {categorias.map((categoria) => (
                <CardCategoria key={categoria.id} categoria={categoria} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ListaCategorias;
