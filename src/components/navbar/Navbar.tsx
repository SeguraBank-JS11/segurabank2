import React from "react";
import { ShieldCheck, Menu, User, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-bank-blue p-1.5 rounded-lg">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-bank-blue tracking-tight">
              SeguraBank
            </span>
          </Link>

          {/* Links de Navegação (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/home"
              className="text-gray-600 hover:text-bank-blue font-medium transition-colors"
            >
              Home
            </Link>

            <Link
              to="/categorias"
              className="text-gray-600 hover:text-bank-blue font-medium transition-colors"
            >
              Categorias
            </Link>

            <Link
              to="/produtos"
              className="text-gray-600 hover:text-bank-blue font-medium transition-colors"
            >
              Produtos
            </Link>
            <Link
              to="/sobre"
              className="text-gray-600 hover:text-bank-blue font-medium transition-colors"
            >
              Sobre Nós
            </Link>
          </div>

          {/* Ações do Usuário */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
            </button>
            <div className="h-10 w-10 bg-bank-blue rounded-full flex items-center justify-center text-white cursor-pointer">
              <User size={20} />
            </div>
            {/* Menu Mobile (Hamburguer) */}
            <button className="md:hidden p-2 text-gray-500">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
