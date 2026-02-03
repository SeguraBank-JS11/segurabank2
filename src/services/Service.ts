import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header)
    setDados(resposta.data)
}

export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data)
}

export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
}

export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header)
}


//////////////////////////////////////////////////////////////
//ABAIXO TUDO INUTIL

// import axios from "axios";

// /**
//  * Base URL vem do .env
//  * Exemplo:
//  * VITE_API_URL=https://segurabank.onrender.com
//  */
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL
// });

// /**
//  * Flag para modo "visualização" sem exigir login.
//  * No seu .env:
//  * VITE_SKIP_AUTH=true
//  *
//  * Importante:
//  * Sempre que você alterar o .env, reinicie o Vite:
//  * pare o "npm run dev" e rode de novo.
//  */
// export const SKIP_AUTH = String(import.meta.env.VITE_SKIP_AUTH) === "true";

// /**
//  * Monta o header Authorization no padrão do Swagger:
//  * Authorization: Bearer <token>
//  *
//  * - Se SKIP_AUTH estiver true, retorna {} (sem headers)
//  * - Se token estiver vazio, retorna {} também
//  */
// export function authHeader(token?: string) {
//   if (SKIP_AUTH) return {};
//   if (!token) return {};

//   return {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   };
// }

// /**
//  * POST genérico para cadastrar usuário (rota pública normalmente).
//  */
// export async function cadastrarUsuario(
//   url: string,
//   dados: object,
//   setDados: (data: any) => void
// ) {
//   const resposta = await api.post(url, dados);
//   setDados(resposta.data);
// }

// /**
//  * POST genérico para login.
//  * Esse endpoint deve retornar o usuário com token preenchido.
//  */
// export async function login(
//   url: string,
//   dados: object,
//   setDados: (data: any) => void
// ) {
//   const resposta = await api.post(url, dados);
//   setDados(resposta.data);
// }

// /**
//  * GET genérico
//  * Ex:
//  * buscar("/categoria", setCategorias, authHeader(token))
//  */
// export async function buscar(
//   url: string,
//   setDados: (data: any) => void,
//   header: object = {}
// ) {
//   const resposta = await api.get(url, header);
//   setDados(resposta.data);
// }

// /**
//  * POST genérico (rotas privadas normalmente).
//  */
// export async function cadastrar(
//   url: string,
//   dados: object,
//   setDados: (data: any) => void,
//   header: object = {}
// ) {
//   const resposta = await api.post(url, dados, header);
//   setDados(resposta.data);
// }

// /**
//  * PUT genérico (rotas privadas normalmente).
//  */
// export async function atualizar(
//   url: string,
//   dados: object,
//   setDados: (data: any) => void,
//   header: object = {}
// ) {
//   const resposta = await api.put(url, dados, header);
//   setDados(resposta.data);
// }

// /**
//  * DELETE genérico (rotas privadas normalmente).
//  */
// export async function deletar(url: string, header: object = {}) {
//   await api.delete(url, header);
// }
