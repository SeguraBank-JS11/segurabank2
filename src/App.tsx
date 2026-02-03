import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes fixos de layout
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

// Páginas
import Home from "./pages/home/Home";
import About from "./pages/sobre/About";

// Categoria (TASK ATUAL)
import ListaCategorias from "./components/categoria/listaCategoria/ListaCategoria";
import FormCategoria from "./components/categoria/formcategoria/FormCategoria";
import DeletarCategoria from "./components/categoria/deletarcategoria/DeletarCategoria";

// Produto (já existente no projeto)
import ListaProdutos from "./components/produto/listaproduto/ListaProduto";

// Contexto de autenticação
import { AuthProvider } from "./contexts/AuthContext";

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      {/* Contexto global de autenticação */}
      <AuthProvider>
        {/* Container global de alertas */}
        <ToastContainer />

        <Router>
          <div className="flex flex-col min-h-screen">
            {/* Menu fixo */}
            <Navbar />

            {/* Conteúdo que muda conforme a rota */}
            <main className="grow">
              <Routes>
                {/* Rotas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/sobre" element={<About />} />

                {/* ========================= */}
                {/* ROTAS DE CATEGORIA (SINGULAR) */}
                {/* ========================= */}
                <Route path="/categoria" element={<ListaCategorias />} />
                <Route
                  path="/categoria/cadastrar"
                  element={<FormCategoria />}
                />
                <Route
                  path="/categoria/editar/:id"
                  element={<FormCategoria />}
                />
                <Route
                  path="/categoria/deletar/:id"
                  element={<DeletarCategoria />}
                />

                {/* ========================= */}
                {/* ROTAS DE PRODUTO */}
                {/* ========================= */}
                <Route path="/produtos" element={<ListaProdutos />} />
              </Routes>
            </main>

            {/* Rodapé fixo */}
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
