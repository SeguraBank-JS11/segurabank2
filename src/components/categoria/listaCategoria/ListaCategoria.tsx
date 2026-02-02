import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { buscar, authHeader } from "../../../services/Service";
import CardCategoria from "../cardcategoria/CardCategoria";
import { ToastAlerta } from "../../../utils/ToastAlerta";

/**
 * ListaCategorias
 *
 * Objetivo:
 * - Listar categorias consumindo o endpoint do Swagger: GET /categoria
 *
 * Regras de autenticação:
 * - Se VITE_SKIP_AUTH=true: modo dev (permite ver a tela sem login)
 *   - Ainda assim, o backend pode responder 401
 *   - Nesse caso, usamos um MOCK local para visualizar a UI
 * - Se VITE_SKIP_AUTH=false: exige token e protege a rota
 *
 * Observação sobre React 18:
 * - Em dev com StrictMode, efeitos rodam 2x.
 *   Usamos refs para evitar toasts duplicados e chamadas repetidas.
 */
function ListaCategorias() {
  const navigate = useNavigate();

  // Estado de loading
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Lista de categorias vinda da API (ou mock)
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // AuthContext: usuário + logout
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  /**
   * Flag para modo dev sem autenticação
   * No .env:
   * VITE_SKIP_AUTH=true
   */
  const skipAuth = String(import.meta.env.VITE_SKIP_AUTH) === "true";

  /**
   * Refs para evitar duplicidade em dev (StrictMode)
   */
  const avisouSemTokenRef = useRef(false);
  const fezFetchRef = useRef(false);

  /**
   * Mock local para visualizar UI quando não existe login pronto
   * ou quando o backend exige auth e retorna 401.
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
   * 1) Proteção de rota (apenas quando skipAuth=false)
   * Se não tiver token, avisa e volta para "/"
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
   * - skipAuth=true: tenta buscar mesmo assim (para quem quer testar)
   * - skipAuth=false: só busca se tiver token
   *
   * Observação:
   * O backend do SeguraBank protege GET /categoria com Bearer,
   * então em skipAuth=true a API provavelmente vai responder 401.
   * Por isso temos fallback para MOCK.
   */
  useEffect(() => {
    // Evita double fetch no StrictMode em dev
    if (fezFetchRef.current) return;

    // Se está sem auth e sem token, não tenta buscar na API (vai dar 401)
    // e já mostra mock para visualizar UI.
    if (skipAuth && !token) {
      fezFetchRef.current = true;
      setCategorias(MOCK_CATEGORIAS);
      return;
    }

    // Se não está em skipAuth, precisa de token para buscar
    if (!skipAuth && !token) return;

    // Se chegou aqui, pode tentar buscar
    fezFetchRef.current = true;
    buscarCategorias();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, skipAuth]);

  /**
   * Função que busca categorias no backend.
   */
  async function buscarCategorias() {
    try {
      setIsLoading(true);

      /**
       * Header:
       * - Se tiver token, usamos Bearer
       * - Se skipAuth=true e token vazio, header será {}
       */
      const header = token ? authHeader(token) : {};

      await buscar("/categoria", setCategorias, header);
    } catch (error: any) {
      const msg = error?.toString?.() ?? "";

      /**
       * Caso 401:
       * - skipAuth=false: logout e volta para home
       * - skipAuth=true: fallback para mock e não trava sua vida
       */
      if (msg.includes("401")) {
        if (!skipAuth) {
          handleLogout();
          ToastAlerta("Sessão expirada. Faça login novamente.", "info");
          navigate("/");
        } else {
          ToastAlerta(
            "API pediu login (401). Mostrando mock só para visualizar a tela.",
            "info"
          );
          setCategorias(MOCK_CATEGORIAS);
        }
        return;
      }

      // Erro genérico
      ToastAlerta("Erro ao listar categorias.", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Loader */}
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader size={32} />
        </div>
      )}

      {/* Conteúdo */}
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          {/* Estado vazio */}
          {!isLoading && categorias.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhuma categoria foi encontrada!
            </span>
          )}

          {/* Grid de cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorias.map((categoria) => (
              <CardCategoria key={categoria.id} categoria={categoria} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaCategorias;
