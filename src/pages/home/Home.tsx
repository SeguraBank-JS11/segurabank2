import { ArrowRight, Heart, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
// Importando a imagem que você salvou (ajuste o nome se necessário)
import familyImage from '../../assets/familia-segura.png'; 

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section (Destaque Principal) */}
      <section className="bg-linear-to-br from-gray-50 to-blue-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Texto */}
            <div className="space-y-6">
              <span className="inline-block bg-blue-100 text-bank-blue px-4 py-1 rounded-full text-sm font-semibold">
                Novo Seguro Família 2026
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Proteja o futuro de quem você <span className="text-bank-blue">mais ama.</span>
              </h1>
              <p className="text-lg text-gray-600">
                Seguro de vida inteligente, 100% digital e com coberturas que se adaptam ao momento da sua família. Simples assim.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/produto" className="bg-bank-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-800 transition flex items-center justify-center gap-2">
                  Simular Agora <ArrowRight size={20} />
                </Link>
                <Link to="/sobre" className="bg-white text-bank-blue border border-gray-200 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center">
                  Conhecer Planos
                </Link>
              </div>
            </div>

            {/* Imagem (Usando a foto da família) */}
            <div className="relative">
              <div className="absolute -inset-4 bg-bank-green/20 rounded-full blur-3xl opacity-30"></div>
              <img 
                src={familyImage} 
                alt="Família feliz: avós, mãe e filha sorrindo juntos" 
                className="relative rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition duration-500 object-cover w-full h-100]"
              />
              {/* Card Flutuante */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-bounce">
                <div className="bg-red-100 p-2 rounded-full">
                  <Heart className="text-red-500 fill-current" size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">+ 50 mil</p>
                  <p className="text-xs text-gray-500">Famílias protegidas</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Seção de Diferenciais (Grid) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Por que escolher o SeguraBank?</h2>
            <p className="text-gray-600 mt-4">Tecnologia de ponta unida ao cuidado humano.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-blue-50 transition border border-gray-100">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Zap className="text-bank-blue" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Contratação Flash</h3>
              <p className="text-gray-600">Nada de papelada. Seu seguro ativo em menos de 3 minutos pelo app.</p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-blue-50 transition border border-gray-100">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Shield className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Cobertura Global</h3>
              <p className="text-gray-600">Proteção válida em todo o território nacional e viagens internacionais.</p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-blue-50 transition border border-gray-100">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Heart className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Cuidado Geracional</h3>
              <p className="text-gray-600">Planos especiais que incluem pais e avós na mesma apólice.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;