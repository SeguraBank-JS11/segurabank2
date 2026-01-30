import React from 'react';
import { ShieldCheck, Facebook, Instagram, Linkedin, Github } from 'lucide-react';
import { LinkedinLogoIcon , GithubLogoIcon , FacebookLogoIcon } from "@phosphor-icons/react"

const Footer = () => {
  return (
    <footer className="bg-bank-blue text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Coluna 1: Marca */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-bank-green" size={24} />
              <span className="text-xl font-bold">SeguraBank</span>
            </div>
            <p className="text-blue-100 text-sm">
              Segurança para quem você ama, tecnologia para o seu dia a dia.
            </p>
          </div>

          {/* Coluna 2: Links */}
          <div>
            <h3 className="font-bold mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm text-blue-100">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/produto" className="hover:text-white transition">Nossos Seguros</a></li>
              <li><a href="/sobre" className="hover:text-white transition">Sobre a Empresa</a></li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div>
            <h3 className="font-bold mb-4">Fale Conosco</h3>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>0800 123 4567</li>
              <li>suporte@segurabank.com.br</li>
              <li>Av. Paulista, 1000 - SP</li>
            </ul>
          </div>

          {/* Coluna 4: Redes */}
          <div>
            <h3 className="font-bold mb-4">Siga-nos</h3>
            <div className="flex gap-4">
              <a href="https://github.com/SeguraBank-JS11" target="_blank" className="hover:text-bank-green transition"><Github size={24} /></a>
              <a href="#" className="hover:text-bank-green transition"><Linkedin size={24} /></a>
              <a href="#" className="hover:text-bank-green transition"><Facebook size={24} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-12 pt-8 text-center text-sm text-blue-200">
          © 2026 SeguraBank. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;