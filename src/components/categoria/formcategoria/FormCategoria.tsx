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
import {
  atualizar,
  buscar,
  cadastrar,
  authHeader
} from "../../../services/Service";
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

  // Flag de modo dev
  const skipAuth = String(import.meta.env.VITE_SKIP_AUTH) === "true";

  // Evita toast duplicado no StrictMode
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
      // Mock para visualização da tela em modo dev
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

  function retornar() {
    navigate("/categorias");
  }

  /**
   * Salvar categoria (POST ou PUT)
   */
  async function salvarCategoria(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Em modo dev sem auth, apenas simula
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
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id ? "Editar Categoria" : "Cadastrar Categoria"}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={salvarCategoria}>
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            name="nome"
            value={categoria.nome}
            onChange={atualizarEstado}
            className="border-2 border-slate-700 rounded p-2"
            placeholder="Digite o nome da categoria"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição</label>
          <input
            id="descricao"
            type="text"
            name="descricao"
            value={categoria.descricao}
            onChange={atualizarEstado}
            className="border-2 border-slate-700 rounded p-2"
            placeholder="Digite a descrição"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
        >
          {isLoading ? <ClipLoader size={24} /> : id ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

export default FormCategoria;
