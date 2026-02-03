import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AlertTriangle, Trash2, ArrowLeft } from "lucide-react";

import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { buscar, deletar, authHeader } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

/**
 * DeletarCategoria
 *
 * Objetivo:
 * - Buscar categoria pelo id e exibir confirmação
 * - Ao confirmar, chamar DELETE /categoria/:id
 *
 * Modo dev (VITE_SKIP_AUTH=true):
 * - Se estiver sem token, renderiza dados mock para a UI existir
 * - Ao confirmar, simula a exclusão e volta para listagem
 *
 * Rotas (singular):
 * - Listagem: /categoria
 * - Deletar:  /categoria/deletar/:id
 */
function DeletarCategoria() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  /**
   * Estado da categoria que será exibida na tela de confirmação
   */
  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: "",
    descricao: ""
  });

  /**
   * Loading do botão "Sim" (confirmar exclusão)
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * AuthContext: token e função de logout
   */
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  /**
   * Flag para liberar UI sem login em dev
   */
  const skipAuth = String(import.meta.env.VITE_SKIP_AUTH) === "true";

  /**
   * Ref para evitar toast duplicado no StrictMode do React 18
   */
  const avisouRef = useRef(false);

  /**
   * Proteção de rota:
   * - Em produção (skipAuth=false), exige token
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
   * Busca a categoria pelo id para mostrar o que será deletado
   */
  useEffect(() => {
    if (!id) return;

    // Modo dev sem token: mostra mock só para UI existir
    if (skipAuth && !token) {
      setCategoria({
        id: Number(id),
        nome: "Categoria Mock",
        descricao: "Exclusão simulada em modo desenvolvimento"
      });
      return;
    }

    buscarPorId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  /**
   * Busca categoria no backend
   * Endpoint esperado: GET /categoria/:id
   */
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
   * Volta para listagem (singular)
   */
  function retornar() {
    navigate("/categoria");
  }

  /**
   * Confirma exclusão:
   * - Em dev sem token, apenas simula
   * - Em produção, chama DELETE /categoria/:id
   */
  async function deletarCategoria() {
    if (skipAuth && !token) {
      ToastAlerta("Exclusão simulada em modo desenvolvimento.", "info");
      retornar();
      return;
    }

    setIsLoading(true);

    try {
      await deletar(`/categoria/${id}`, authHeader(token));
      ToastAlerta("Categoria deletada com sucesso!", "sucesso");
      retornar();
    } catch (error: any) {
      if (error?.toString()?.includes("401")) {
        handleLogout();
        ToastAlerta("Sessão expirada. Faça login novamente.", "info");
        navigate("/");
      } else {
        ToastAlerta("Erro ao deletar categoria.", "erro");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-linear-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho no estilo Home */}
        <div className="mb-8 space-y-3 text-center">
          <span className="inline-flex items-center gap-2 bg-blue-100 text-bank-blue px-4 py-1 rounded-full text-sm font-semibold">
            <AlertTriangle size={16} />
            Atenção
          </span>

          <h1 className="text-4xl font-bold text-gray-900">Deletar Categoria</h1>

          <p className="text-gray-600">
            Você tem certeza que deseja apagar a categoria abaixo? Essa ação não pode ser desfeita.
          </p>
        </div>

        {/* Card clean */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900">{categoria.nome}</h2>
            <p className="text-gray-600 mt-3">{categoria.descricao}</p>
          </div>

          {/* Ações com padrão de botões */}
          <div className="border-t border-gray-100 p-5 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              onClick={retornar}
              className="inline-flex items-center justify-center gap-2 bg-white text-bank-blue border border-gray-200 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              <ArrowLeft size={18} />
              Cancelar
            </button>

            <button
              type="button"
              onClick={deletarCategoria}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition disabled:opacity-60"
            >
              {isLoading ? <ClipLoader size={20} /> : <Trash2 size={18} />}
              Confirmar exclusão
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletarCategoria;
