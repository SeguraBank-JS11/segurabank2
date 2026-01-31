import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import About from './pages/sobre/About';
import Produtos from './components/produto/listaproduto/ListaProduto';

import 'react-toastify/dist/ReactToastify.css'
import ListaProdutos from './components/produto/listaproduto/ListaProduto';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<>
			<AuthProvider>
				<ToastContainer />
				<Router>
					<div className="flex flex-col min-h-screen">
					<Navbar />
						 {/* Área de conteúdo que muda conforme a rota */}
						<main className="grow">
						<Routes>
							
							<Route path="/home" element={<Home />} />
							<Route path="/sobre" element={<About />} />
							{/* <Route path="/login" element={<Login />} />
							<Route path="/cadastro"	element={<Cadastro />}/>
							<Route path="/categorias" element={<ListaCategorias />} />
							<Route path="/cadastrarcategoria" element={<FormCategoria />} />
							<Route path="/editarcategoria/:id" element={<FormCategoria />} />
							<Route path="/deletarcategoria/:id" element={<DeletarCategoria />} /> */}
							<Route path="/produtos" element={<ListaProdutos />} />
							{/* <Route path="/cadastrarproduto" element={<FormProduto />} />
							<Route path="/editarproduto/:id" element={<FormProduto />} />
							<Route path="/deletarproduto/:id" element={<DeletarProduto />} />
							<Route path="/perfil" element={<Perfil />} /> */}
						</Routes>
						</main>
					<Footer />
					</div>
				</Router>
			</AuthProvider>
		</>
	)
}

export default App
