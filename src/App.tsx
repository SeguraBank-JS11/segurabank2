import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Componentes fixos de layout
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'

// Páginas
import Home from './pages/home/Home'
import About from './pages/sobre/About'
import Cadastro from './pages/cadastro/Cadastro'
import Login from './pages/login/Login'

// Categoria (TASK ATUAL)
import ListaCategorias from './components/categoria/listaCategoria/ListaCategoria'
import FormCategoria from './components/categoria/formcategoria/FormCategoria'
import DeletarCategoria from './components/categoria/deletarcategoria/DeletarCategoria'

// Produto (já existente no projeto)
import ListaProdutos from './components/produto/listaproduto/ListaProduto'

// Contexto de autenticação
import { AuthProvider } from './contexts/AuthContext'

// Toast
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/cadastro"	element={<Cadastro />}/>

                {/* ========================= */}
                {/* ROTAS DE CATEGORIA */}
                {/* ========================= */}

                {/* Listar categorias */}
                <Route
                  path="/categoria"
                  element={<ListaCategorias />}
                />

                {/* Cadastrar nova categoria */}
                <Route
                  path="/cadastrarcategoria"
                  element={<FormCategoria />}
                />

                {/* Editar categoria */}
                <Route
                  path="/editarcategoria/:id"
                  element={<FormCategoria />}
                />

                {/* Deletar categoria */}
                <Route
                  path="/deletarcategoria/:id"
                  element={<DeletarCategoria />}
                />

                {/* ========================= */}
                {/* ROTAS DE PRODUTO */}
                {/* ========================= */}

                <Route
                  path="/produtos"
                  element={<ListaProdutos />}
                />

                {/* As próximas ficam para depois */}
                {/*
                <Route path="/cadastrarproduto" element={<FormProduto />} />
                <Route path="/editarproduto/:id" element={<FormProduto />} />
                <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
                <Route path="/perfil" element={<Perfil />} />
                */}

              </Routes>
            </main>

            {/* Rodapé fixo */}
            <Footer />

          </div>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
