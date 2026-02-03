import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { buscar, deletar, authHeader } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

/**
 * DeletarCategoria
 *
 * Objetivo:
 * - Buscar a categoria pelo id (GET /categoria/:id)
 * - Exibir confirmação de exclusão
 * - Deletar a categoria no backend (DELETE /categoria/:id)
 *
 * Suporte a modo dev:
 * - Se VITE_SKIP_AUTH=true e não houver token:
 *   - Mostra dados mock para a tela existir
 *   - Simula a exclusão
 *
 * Padrão de rotas (singular):
 * - Listagem: /categoria
 * - Deletar:  /categoria/deletar/:id
 */
function DeletarCategoria() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Estado da categoria selecionada para exclusão
  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: "",
    descricao: ""
  });

  // Loading do botão confirmar
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Auth
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  // Flag modo dev
  const skipAuth = String(import.meta.env.VITE_SKIP_AUTH) === "true";

  // Evita toast duplicado no StrictMode
  const avisouRef = useRef(false);

  /**
   * Proteção de rota:
   * - Quando NÃO estiver em modo dev, exige token
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
   * Busca categoria para mostrar na confirmação
   */
  useEffect(() => {
    if (!id) return;

    // Modo dev sem token: mock para tela existir
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
   * Retorna para a listagem (singular)
   */
  function retornar() {
    navigate("/categoria");
  }

  /**
   * Confirma exclusão
   */
  async function deletarCategoria() {
    // Modo dev sem token: simula para a tela funcionar
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
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar Categoria</h1>

      <p className="text-center font-semibold mb-4">
        Você tem certeza que deseja apagar a categoria abaixo?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden">
        <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
          {categoria.nome}
        </header>

        <p className="p-6 bg-slate-200">{categoria.descricao}</p>

        <div className="flex">
          <button
            type="button"
            onClick={retornar}
            className="w-full bg-red-400 hover:bg-red-600 text-white py-2"
          >
            Não
          </button>

          <button
            type="button"
            onClick={deletarCategoria}
            disabled={isLoading}
            className="w-full bg-indigo-400 hover:bg-indigo-600 text-white flex justify-center items-center"
          >
            {isLoading ? <ClipLoader size={24} /> : "Sim"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarCategoria;
