import { Link } from "react-router-dom";
import { ArrowRight, Shield, Target, Sparkles } from "lucide-react";
import logo from "../../assets/LOGO_SEGURABANK1.png";

type Produto = {
  titulo: string;
  subtitulo: string;
  foco: string;
  coberturas: string[];
  diferencial: string;
  tag: string;
};

export default function About() {
  // Lista de produtos (cards da seção "Soluções do SeguraBank")
  const produtos: Produto[] = [
    {
      titulo: "Segura Vida Digital",
      subtitulo: "Foco em Profissionais Tech",
      foco: "Um plano pensado para quem vive do intelecto e da tecnologia.",
      coberturas: [
        "Morte e invalidez",
        "Doenças graves ligadas à rotina tech (ex.: Burnout, LER/DORT)",
      ],
      diferencial:
        "Assistência técnica remota para dispositivos pessoais e consultoria ergonômica via app.",
      tag: "Tech First",
    },
    {
      titulo: "Segura Família Conecta",
      subtitulo: "Proteção Geracional",
      foco: "Proteção para o titular com extensão de assistência para dependentes seniores (pais e avós).",
      coberturas: [
        "Cobertura para o titular",
        "Assistência estendida para dependentes seniores",
      ],
      diferencial:
        "Auxílio Inventário com consultoria jurídica e financeira para organizar sucessão e liberar ativos com menos burocracia.",
      tag: "Família",
    },
    {
      titulo: "Segura Junior",
      subtitulo: "Start na Vida Adulta",
      foco: "Produto de entrada com custo acessível, ideal para estagiários, juniors e início de carreira.",
      coberturas: [
        "Acidentes pessoais",
        "Auxílio funeral",
        "Cobertura essencial",
      ],
      diferencial:
        "Cashback em Educação: parte do valor volta como crédito para cursos e bootcamps.",
      tag: "Low Entry",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* HERO: bloco principal do Sobre */}
      <section className="bg-linear-to-br from-gray-50 to-blue-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm">
            {/* Cabeçalho do hero: Logo grande (estilo "perfil") + conteúdo */}
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* LOGO GRANDE em destaque */}
              <div className="shrink-0">
                <div className="w-64 h-64 md:w-96 md:h-96 rounded-4xl bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-xl ring-2 ring-blue-200 flex items-center justify-center p-10">
                  <img
                    src={logo}
                    alt="Logo SeguraBank"
                    className="w-56 md:w-64 h-auto object-contain drop-shadow-md"
                  />
                </div>
              </div>

              {/* TEXTO do hero */}
              <div className="flex-1">
                <p className="text-sm font-semibold text-bank-blue tracking-wide">
                  PROJETO INTEGRADOR
                </p>

                <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
                  Sobre o SeguraBank
                </h1>

                <p className="mt-3 max-w-3xl text-gray-600 leading-relaxed">
                  O SeguraBank é um ecossistema de proteção financeira com
                  experiência digital moderna. Nossa proposta é unir tecnologia,
                  clareza e confiança em uma plataforma simples, responsiva e
                  pronta para evoluir com novas funcionalidades e integrações.
                </p>

                {/* TAGS: reforçam atributos do projeto */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-blue-100 text-bank-blue px-3 py-1 text-xs font-semibold">
                    Seguro Digital
                  </span>
                  <span className="inline-flex items-center rounded-full bg-blue-100 text-bank-blue px-3 py-1 text-xs font-semibold">
                    Simples e Transparente
                  </span>
                  <span className="inline-flex items-center rounded-full bg-blue-100 text-bank-blue px-3 py-1 text-xs font-semibold">
                    UX e Responsividade
                  </span>
                  <span className="inline-flex items-center rounded-full bg-blue-100 text-bank-blue px-3 py-1 text-xs font-semibold">
                    Evolutivo
                  </span>
                </div>
              </div>
            </div>

            {/* MISSÃO / VISÃO / VALORES */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Missão */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-blue-50 transition">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-5">
                  <Target className="text-bank-blue" size={22} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Missão</h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  Proteger pessoas e famílias com soluções digitais acessíveis,
                  seguras e fáceis de entender.
                </p>
              </div>

              {/* Visão */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-blue-50 transition">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-5">
                  <Shield className="text-green-700" size={22} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Visão</h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  Ser referência em proteção digital no Brasil, unindo
                  tecnologia e cuidado humano.
                </p>
              </div>

              {/* Valores */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-blue-50 transition">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-5">
                  <Sparkles className="text-purple-700" size={22} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Valores</h3>
                <ul className="mt-2 text-gray-600 text-sm space-y-2">
                  <li>Transparência e ética</li>
                  <li>Confiança e segurança</li>
                  <li>Inovação com empatia</li>
                </ul>
              </div>
            </div>

            {/* BOTÕES: CTA para navegar */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/produto"
                className="bg-bank-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-800 transition flex items-center justify-center gap-2"
              >
                Ver produtos <ArrowRight size={20} />
              </Link>

              <Link
                to="/"
                className="bg-white text-bank-blue border border-gray-200 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center"
              >
                Voltar para Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUÇÕES / PLANOS: cards dos produtos */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Soluções do SeguraBank
            </h2>
            <p className="mt-3 text-gray-600 max-w-3xl">
              Planos criados para diferentes momentos da vida, com coberturas
              claras e diferenciais que fazem sentido no dia a dia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {produtos.map((p) => (
              <article
                key={p.titulo}
                className="rounded-2xl bg-gray-50 border border-gray-100 p-7 hover:bg-blue-50 transition"
              >
                {/* Cabeçalho do card */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {p.titulo}
                    </h3>
                    <p className="text-sm font-semibold text-bank-blue mt-1">
                      {p.subtitulo}
                    </p>
                  </div>

                  <span className="inline-flex items-center rounded-full bg-blue-100 text-bank-blue px-3 py-1 text-xs font-semibold">
                    {p.tag}
                  </span>
                </div>

                {/* Foco do produto */}
                <p className="mt-5 text-gray-600 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-900">Foco:</span>{" "}
                  {p.foco}
                </p>

                {/* Lista de coberturas */}
                <div className="mt-5">
                  <p className="text-sm font-bold text-gray-900">Coberturas</p>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
                    {p.coberturas.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-bank-blue shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Diferencial do produto */}
                <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
                  <p className="text-sm font-bold text-gray-900">
                    Diferencial SeguraBank
                  </p>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {p.diferencial}
                  </p>
                </div>

                {/* CTA do card */}
                <div className="mt-6">
                  <Link
                    to="/produto"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-bank-blue px-6 py-3 text-white font-semibold hover:bg-blue-800 transition"
                  >
                    Ver detalhes do plano
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
