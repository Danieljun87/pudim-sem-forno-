import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, 
  MessageCircle, 
  ShieldCheck, 
  Lock, 
  Gift, 
  Smartphone, 
  Plus, 
  Star, 
  Zap,
  HelpCircle,
  ChevronDown,
  X,
  AlertCircle,
  ThumbsUp,
  Target,
  Trophy,
  Sun
} from 'lucide-react';

const femaleNames = [
  "Regina", "Maria", "Ana", "Beatriz", "Carla", "Fernanda", "Juliana", "Letícia", 
  "Mariane", "Patrícia", "Sandra", "Vanessa", "Aline", "Camila", "Débora", 
  "Eliane", "Fabiana", "Gisele", "Helena", "Isabela", "Luciana", "Mônica", 
  "Renata", "Simone", "Tatiane", "Roseli", "Cláudia", "Marta", "Adriana", 
  "Amanda", "Alessandra", "Bárbara", "Bianca", "Bruna", "Cristiane", "Daniela", 
  "Dayane", "Eduarda", "Emanuele", "Ester", "Franciele", "Gabriela", "Giovanna", 
  "Graziele", "Ingrid", "Jaqueline", "Jéssica", "Karina", "Karine", "Larissa", 
  "Lidiane", "Lorena", "Luana", "Maitê", "Milena", "Natália", "Nicole", "Pâmela", 
  "Priscila", "Rafaela", "Raquel", "Rebeca", "Sabrina", "Samara", "Tainá", 
  "Talita", "Thais", "Vitória", "Célia", "Daniele", "Estela", "Flávia", "Glória", 
  "Iara", "Joyce", "Kelly", "Lívia", "Mirella", "Nayara", "Olívia", "Paula", 
  "Rose", "Sônia", "Tereza", "Ursula", "Vera", "Zilda", "Tatiana", "Silvia", 
  "Sueli", "Telma", "Teresa", "Valéria", "Viviane", "Zuleide", "Marlene", "Marli", 
  "Ivone", "Iracema", "Irene", "Iolanda", "Isadora", "Heloísa", "Geovana", "Gisela", 
  "Glauce", "Graciela", "Hilda", "Inês", "Iris", "Isabel", "Jaciara", "Janaina", 
  "Janete", "Joana", "Josefa", "Josiane", "Jussara", "Lia", "Lilian", "Lourdes", 
  "Lucélia", "Luiza", "Luzia", "Magali", "Mara", "Marilda", "Marisa", "Maristela", 
  "Miriam", "Nadir", "Nair", "Neusa", "Nilza", "Noemi", "Norma", "Odete", "Ofélia", 
  "Palmira", "Quitéria", "Rita", "Rute", "Soraia", "Tânia", "Vânia", "Yara", 
  "Zeni", "Zuleica", "Dandara", "Eloá", "Clarice", "Solange", "Arlete"
];

const SocialProof = () => {
  const [currentName, setCurrentName] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const usedNamesRef = useRef<string[]>([]);
  const timeoutRef = useRef<any>(null);

  const showNotification = () => {
    const availableNames = femaleNames.filter(name => !usedNamesRef.current.includes(name));
    const pool = availableNames.length > 0 ? availableNames : femaleNames;
    
    const randomIndex = Math.floor(Math.random() * pool.length);
    const selectedName = pool[randomIndex];

    setCurrentName(selectedName);
    usedNamesRef.current = [...usedNamesRef.current, selectedName];
    if (usedNamesRef.current.length > 50) {
      usedNamesRef.current.shift();
    }
    
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    const nextDelay = Math.floor(Math.random() * (14000 - 7000 + 1)) + 7000;
    timeoutRef.current = setTimeout(showNotification, nextDelay);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(showNotification, 3000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-4 right-4 z-[200] transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white/90 backdrop-blur-lg border-2 border-[#00E000] text-gray-900 px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-3">
        <div className="bg-[#00E000] p-1 rounded-full">
          <CheckCircle size={14} className="text-white" />
        </div>
        <span className="text-[10px] md:text-sm font-black tracking-wider uppercase">
          {currentName} <span className="text-gray-500 font-bold">comprou agora!</span>
        </span>
      </div>
    </div>
  );
};

const FAQItem = ({ number, question, answer }: { number: number, question: string, answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left gap-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="bg-[#0066CC] text-white w-6 h-6 md:w-7 md:h-7 rounded flex items-center justify-center font-black text-xs md:text-sm shrink-0">
            {number}
          </div>
          <span className="text-base md:text-xl font-black text-gray-950 tracking-tight leading-tight">
            {question}
          </span>
        </div>
        <ChevronDown 
          className={`shrink-0 text-orange-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          size={24} 
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] pb-5' : 'max-h-0'}`}>
        <div className="text-gray-700 font-medium text-sm md:text-lg leading-relaxed tracking-tight pl-9 md:pl-10">
          {answer}
        </div>
      </div>
    </div>
  );
};

const BonusCard = ({ title, description, image, oldPrice }: { title: string, description: string, image: string, oldPrice: string }) => (
  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 bg-white border border-gray-200 shadow-xl rounded-[24px] p-6 md:p-8 hover:shadow-2xl transition-all duration-300 w-full mb-12 last:mb-0 border-b-4 border-b-gray-100">
    <div className="w-full md:w-[45%] shrink-0">
      <div className="relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-[250px] md:h-[300px] object-contain"
        />
      </div>
    </div>
    <div className="flex-1 w-full text-left flex flex-col gap-4">
      {/* Price Section */}
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="text-[#ff0000] font-bold text-lg md:text-xl line-through decoration-2">{oldPrice}</span>
        <div className="bg-[#00E000] text-white px-4 py-1.5 rounded-lg font-black text-lg md:text-xl uppercase tracking-wider shadow-md transform -rotate-1 inline-block">
          POR R$ 0
        </div>
      </div>
      
      {/* Title */}
      <h3 className="text-[#C62828] font-black text-xl md:text-2xl uppercase leading-tight tracking-tight">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-700 font-medium text-base md:text-lg leading-relaxed border-l-4 border-[#00E000] pl-4">
        {description}
      </p>
    </div>
  </div>
);

const UpsellPopup = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl relative transform transition-all scale-100">
        
        {/* Close Button (X) - Inside top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white transition-colors z-50 p-1 rounded-full shadow-md cursor-pointer border-2 border-white flex items-center justify-center"
          aria-label="Fechar"
        >
          <X size={16} strokeWidth={3} />
        </button>

        {/* Header - Red Background */}
        <div className="bg-red-100 p-3 text-center rounded-t-2xl">
          <p className="text-[#C62828] font-bold text-sm uppercase px-2">
            ATENÇÃO: oportunidade válida só agora
          </p>
        </div>

        <div className="p-6 flex flex-col items-center text-center">
          
          <div className="space-y-3 mb-6">
            <p className="text-gray-900 font-black text-lg leading-tight">
              foi pensando em você, mãe que precisa dessa renda.
            </p>
            <p className="text-gray-700 font-medium text-sm leading-snug">
              Antes de sair, eu liberei uma condição especial pra você.
            </p>
            <div className="pt-2">
                <p className="text-[#ff0000] font-black text-xl mb-1 uppercase">
                🔴 MAS…
                </p>
                <p className="text-[#ff0000] font-bold text-sm leading-tight">
                Se fechar a página agora, essa oferta não aparece novamente.
                </p>
            </div>
          </div>

          {/* Product Box */}
          <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 shadow-inner">
             <p className="text-gray-800 font-bold text-sm mb-2">MÉTODO COMPLETO + BÔNUS</p>
             <p className="text-[#C62828] font-bold text-xl">
               De <span className="line-through">R$ 26,90</span> por
             </p>
             <p className="text-[#00E000] font-black text-4xl">R$ 19,99</p>
          </div>

          {/* Buttons */}
          <a 
            href="https://ggcheckout.com.br/checkout/v2/cus2VSjyMohHqpZIMNuv"
            className="block w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold py-3.5 rounded-xl shadow-lg mb-3 transition-colors text-lg"
          >
            Sim, quero garantir agora
          </a>

          <a 
            href="https://ggcheckout.com.br/checkout/v2/MUyBkmeBYqSrLw3Aw2IL"
            className="block w-full py-2 text-red-600 font-medium text-sm hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            Não, obrigado
          </a>
        </div>

        {/* Footer Warning */}
        <div className="bg-orange-100 p-4 text-center border-t border-orange-200 rounded-b-2xl">
           <p className="text-orange-700 text-xs font-medium leading-relaxed">
             Ao sair ou recarregar a página, você perderá a chance de economizar e não terá outra!
           </p>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [showUpsellPopup, setShowUpsellPopup] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center overflow-x-hidden relative selection:bg-orange-200">
      <SocialProof />
      
      {showUpsellPopup && <UpsellPopup onClose={() => setShowUpsellPopup(false)} />}
      
      {/* Hero Section Part 1 (Yellow Background) */}
      <section className="w-full pt-8 pb-12 px-4 flex flex-col items-center text-center max-w-3xl mx-auto">
        
        {/* Headlines */}
        <div className="flex flex-col items-center mb-5">
          <h1 className="text-[#C62828] font-black text-3xl md:text-5xl uppercase leading-none tracking-tighter mb-2">
            MÃES LUCRAM ATÉ <br/>
            R$2.000/SEMANA
          </h1>
          <h2 className="text-[#C62828] font-black text-2xl md:text-4xl uppercase leading-none tracking-tighter">
            COM PUDINS SEM FORNO QUE <br/>
            PADARIAS TENTAM ESCONDER
          </h2>
        </div>

        {/* Subtext */}
        <div className="mb-10 px-4">
          <p className="font-bold text-[11px] md:text-sm text-gray-900 underline decoration-1 underline-offset-2 leading-tight max-w-lg mx-auto">
            30 Receitas de Pudins Sem Forno, Sem Fogão e Sem Ovos — Simples, Rápidas e Prontas Para Você Começar Hoje.
          </p>
        </div>

        {/* Image 1: Caramel Pudding */}
        <div className="bg-white p-2 rounded-[24px] shadow-2xl mb-8 w-full max-w-[280px] md:max-w-[340px]">
          <img 
            src="https://i.ibb.co/8LMDxjrz/Design-sem-nome-1.png" 
            alt="Pudim de Caramelo" 
            className="w-full rounded-[20px] object-cover aspect-square"
          />
        </div>

      </section>

      {/* Hero Section Part 2 (White Background - From Print) */}
      <section className="w-full bg-white py-12 px-4 flex flex-col items-center text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          
          {/* Orange Warning Blocks */}
          <div className="flex flex-col items-center gap-[2px] mb-8 w-full">
            <div className="bg-[#EA580C] text-white px-3 py-0.5 font-black text-[12px] md:text-base uppercase tracking-wider inline-block">
              SE VOCÊ É MÃE E PRECISA AUMENTAR A RENDA
            </div>
            <div className="bg-[#EA580C] text-white px-3 py-0.5 font-black text-[12px] md:text-base uppercase tracking-wider inline-block">
              SEM SAIR DE CASA, ESSA PODE SER A
            </div>
            <div className="bg-[#EA580C] text-white px-3 py-0.5 font-black text-[12px] md:text-base uppercase tracking-wider inline-block">
              OPORTUNIDADE QUE ESTAVA ESPERANDO
            </div>
          </div>

          {/* Question Block */}
          <h3 className="text-gray-950 font-black text-sm md:text-lg leading-tight mb-3 max-w-md px-4">
            Já imaginou começar com algo simples, rápido e prático — e usar isso para gerar pedidos ainda hoje?
          </h3>
          <p className="text-gray-800 font-bold text-[10px] md:text-xs leading-tight mb-8 max-w-sm px-4">
            Enquanto muitas ainda estão pensando se vai dar certo, outras já estão organizando as próximas encomendas.
          </p>

          {/* Image 2: Red Fruit Pudding */}
          <div className="bg-white p-2 rounded-[24px] shadow-2xl mb-8 w-full max-w-[280px] md:max-w-[340px]">
            <img 
              src="https://i.ibb.co/vCSLF7g8/Design-sem-nome-2.png" 
              alt="Pudim com Calda Vermelha" 
              className="w-full rounded-[20px] object-cover aspect-square"
            />
          </div>

          {/* Final CTA Text */}
          <p className="text-[11px] md:text-sm font-bold text-gray-900 uppercase leading-snug">
            A pergunta é: <span className="text-[#C62828]">vai ficar parada...</span><br/>
            ou vai buscar seus <span className="bg-[#00E000] text-black px-1 py-0.5">R$2.000 por semana?</span>
          </p>
        </div>
      </section>

      {/* Benefits Section Recreated from Image */}
      <section className="w-full py-12 px-4 flex flex-col items-center relative z-10">
        
        {/* Floating Badges */}
        <div className="flex flex-col items-center -mb-5 z-20 space-y-[-5px]">
          <div className="bg-[#EA580C] text-white px-5 py-1.5 rounded-xl font-black text-[12px] md:text-base uppercase tracking-wide shadow-lg flex items-center gap-2 transform -rotate-1 border-2 border-white/20">
            <Zap size={16} fill="currentColor" />
            Por Que Pudim Sem Forno É O Negócio Mais
          </div>
          <div className="bg-[#EA580C] text-white px-8 py-1.5 rounded-xl font-black text-[12px] md:text-base uppercase tracking-wide shadow-lg transform rotate-1 border-2 border-white/20">
            Inteligente Para Começar AGORA
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-[#FDFBE9] w-full max-w-3xl rounded-[32px] p-6 md:p-12 pt-12 shadow-xl border-4 border-white relative mt-2">
          
          <h3 className="text-center text-gray-950 font-black text-sm md:text-xl mb-10 uppercase tracking-tight leading-tight mt-4">
            Olha só os benefícios que você tem com esse método:
          </h3>

          <div className="space-y-6 max-w-2xl mx-auto">
            {[
              { id: 1, title: "ZERO SUJEIRA NA COZINHA", desc: "Não precisa limpar forno cheio de caramelo grudado" },
              { id: 2, title: "ECONOMIA BRUTAL DE GÁS", desc: "Sua conta permanece baixa" },
              { id: 3, title: "RECEITAS PRONTAS EM 15 MINUTOS", desc: "Você faz 10 pudins no tempo que faria 2 no forno" },
              { id: 4, title: "IMPOSSÍVEL DAR ERRADO", desc: "Sem forno = sem queimar. Sem fogão = sem desandar. Sem ovos = textura perfeita SEMPRE" },
              { id: 5, title: "PRODUTO QUE VENDE SOZINHO", desc: '"Pudim sem forno?" gera curiosidade automática' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start group">
                <div className="bg-[#00E000] text-white w-6 h-6 md:w-8 md:h-8 rounded-[4px] flex items-center justify-center font-black text-xs md:text-base shrink-0 mt-0.5 shadow-sm group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <p className="text-[11px] md:text-base text-gray-800 leading-snug font-medium">
                  <span className="font-black uppercase text-gray-950">{item.title}</span> — {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* NEW SECTION: Not 1000 Recipes / The 30 Best */}
      <section className="w-full bg-white py-16 px-4 flex flex-col items-center text-center">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
          {/* Title Group */}
          <div className="flex flex-col items-center gap-1 mb-10">
            <div className="flex items-center gap-2">
              <Target className="text-[#EA580C] w-6 h-6 md:w-8 md:h-8" />
              <span className="bg-[#EA580C] text-white px-2 py-0.5 font-black text-lg md:text-2xl uppercase shadow-md">Não São 1.000 Receitas</span>
            </div>
            <span className="bg-[#EA580C] text-white px-2 py-0.5 font-black text-lg md:text-2xl uppercase shadow-md">Aleatórias — São As 30 Que </span>
            <span className="bg-[#EA580C] text-white px-2 py-0.5 font-black text-lg md:text-2xl uppercase shadow-md">Mais Me Dão Lucro </span>
          </div>

          {/* Intro Text */}
          <div className="text-gray-900 font-medium text-base md:text-lg leading-relaxed mb-8 space-y-4 max-w-xl">
            <p>
              Sabe aquele curso que promete mil receitas mas você não sabe qual realmente vende? <br className="hidden md:block"/>
              <span className="font-black">Esquece isso.</span>
            </p>
            <p>
              Aqui você recebe apenas as 30 receitas <span className="font-bold underline decoration-2 decoration-gray-900 underline-offset-2">testadas, validadas e que mais faturam no meu negócio.</span>
            </p>
          </div>

          {/* Book Image */}
          <div className="relative w-48 md:w-64 mb-10">
            {/* Using pudding image as placeholder for book, styled to float */}
            <img 
              src="https://i.ibb.co/fdqpz1Q1/Gemini-Generated-Image-s12dp3s12dp3s12d-removebg-preview.png" 
              alt="Receitas de Pudim" 
              className="w-full h-auto drop-shadow-2xl rounded-lg transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Benefits List (Specific to the 30 recipes) */}
          <div className="w-full text-left max-w-lg mx-auto">
            <h3 className="text-[#9A3412] font-black text-xl md:text-2xl mb-6">
              São os pudins que:
            </h3>
            <ul className="space-y-4 mb-10">
              {[
                "Meus clientes mais pedem toda semana ",
                "Geram elogios e indicação automática",
                "Têm maior margem de lucro (R$ 8 de custo, R$ 30-50 de venda)",
                "Não dão dor de cabeça nem prejuízo",
                "Nunca voltam com reclamação"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ThumbsUp className="w-6 h-6 text-black fill-[#FBBF24] shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-[#7C2D12] font-bold text-base md:text-xl leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Conclusion */}
          <div className="text-center space-y-1">
            <p className="text-gray-900 font-medium text-lg md:text-xl">
              Você não vai perder tempo testando.
            </p>
            <p className="text-gray-950 font-black text-xl md:text-2xl uppercase">
              Vai direto para o que <span className="underline decoration-4 decoration-green-500 underline-offset-2">DÁ CERTO.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Updated Recipe List Section - GREEN BACKGROUND */}
      <section className="w-full bg-[#81BE72] py-16 px-4 flex flex-col items-center gap-4">
        {/* Header - White text for green bg */}
        <div className="max-w-3xl text-center mb-6">
            <h2 className="text-white font-black text-2xl md:text-4xl leading-tight flex flex-col md:block items-center justify-center uppercase tracking-tight drop-shadow-md">
                <span>🍓 As 30 Receitas Que Vão </span>
                <span>Transformar Seu 2026:</span>
            </h2>
        </div>

        {/* White Card 1 */}
        <div className="bg-white w-full max-w-[500px] rounded-3xl p-6 md:p-8 shadow-2xl relative border border-gray-100">
            <div className="text-center mb-8">
                <h3 className="font-black text-lg md:text-xl text-black uppercase mb-1">OS CAMPEÕES DE VENDA</h3>
                <p className="text-gray-700 text-sm md:text-base font-normal">(esses aqui você PRECISA ter):</p>
            </div>

            <div className="space-y-8">
                {/* Item 1 */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-start gap-2 mb-0">
                        <Trophy className="text-[#D97706] fill-[#D97706] shrink-0 mt-1" size={20} />
                        <h4 className="text-[#D97706] font-black text-base md:text-lg">Pudim de Chocolate</h4>
                    </div>
                    <div className="pl-7 space-y-1">
                        <p className="text-gray-900 text-sm md:text-[15px] leading-snug">
                            → O mais vendido de todos. Custo: R$ 8 | Venda: R$ 30-35
                        </p>
                        <p className="text-gray-900 text-sm md:text-[15px] leading-snug">
                             → Aceitação: 10/10 com crianças e adultos
                        </p>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-start gap-2 mb-0">
                        <Trophy className="text-[#D97706] fill-[#D97706] shrink-0 mt-1" size={20} />
                        <h4 className="text-[#D97706] font-black text-base md:text-lg">Pudim de Leite Ninho</h4>
                    </div>
                    <div className="pl-7 space-y-1">
                        <p className="text-gray-900 text-sm md:text-[15px] leading-snug">
                            → Sucesso ABSOLUTO. Sempre esgota primeiro
                        </p>
                        <p className="text-gray-900 text-sm md:text-[15px] leading-snug">
                             → Dica bônus inclusa: como cobrar R$ 40 neste pudim
                        </p>
                    </div>
                </div>

                 {/* Item 3 */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-start gap-2 mb-0">
                        <Trophy className="text-[#D97706] fill-[#D97706] shrink-0 mt-1" size={20} />
                        <h4 className="text-[#D97706] font-black text-base md:text-lg">Pudim de Morango</h4>
                    </div>
                    <div className="pl-7 space-y-1">
                         <p className="text-gray-900 text-sm md:text-[15px] leading-snug">
                            → Visual que vende nas fotos. Impossível errar
                        </p>
                        <p className="text-gray-900 text-sm md:text-[15px] leading-snug">
                             → Perfeito para quem está começando do ZERO
                        </p>
                    </div>
                </div>

                 {/* Item 4 */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-start gap-2 mb-0">
                        <Trophy className="text-[#D97706] fill-[#D97706] shrink-0 mt-1" size={20} />
                        <h4 className="text-[#D97706] font-black text-base md:text-lg">Pudim Napolitano (3 camadas)</h4>
                    </div>
                     <div className="pl-7 space-y-1">
                        <p className="text-gray-900 text-sm md:text-[15px] leading-snug">
                            → O mais "instagramável" de todos
                        </p>
                        <p className="text-gray-900 text-sm md:text-[15px] leading-snug">
                             → Você cobra R$ 45-50 fácil por causa do visual
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Plus Sign */}
        <Plus size={40} className="text-black" strokeWidth={3} />

        {/* White Card 2 - The Second Session */}
        <div className="bg-white w-full max-w-[500px] rounded-3xl p-6 md:p-8 shadow-2xl relative border border-gray-100">
            
            {/* Premium Section */}
            <div className="mb-10">
                <div className="text-center mb-6">
                    <h3 className="font-black text-lg md:text-xl text-black uppercase mb-1">RECEITAS PREMIUM</h3>
                    <p className="text-gray-700 text-sm md:text-base font-normal">(para aumentar suas vendas):</p>
                </div>

                <div className="space-y-6">
                    <div className="flex items-start gap-2">
                        <Star className="text-[#D97706] fill-[#D97706] shrink-0 mt-1" size={20} />
                        <div>
                            <h4 className="text-[#D97706] font-black text-base md:text-lg inline">Pudim de Caramelo Salgado</h4>
                            <span className="text-gray-900 text-sm md:text-[15px] ml-1">(tendência moderna!)</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <Star className="text-[#D97706] fill-[#D97706] shrink-0 mt-1" size={20} />
                        <h4 className="text-[#D97706] font-black text-base md:text-lg">Pudim de Chocolate Branco com Frutas Vermelhas</h4>
                    </div>

                    <div className="flex items-start gap-2">
                        <Star className="text-[#D97706] fill-[#D97706] shrink-0 mt-1" size={20} />
                        <div>
                             <h4 className="text-[#D97706] font-black text-base md:text-lg inline">Pudim de Queijo com Goiabada</h4>
                             <span className="text-gray-900 text-sm md:text-[15px] ml-1">(o queridinho!)</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <Star className="text-[#D97706] fill-[#D97706] shrink-0 mt-1" size={20} />
                         <div>
                            <h4 className="text-[#D97706] font-black text-base md:text-lg inline">Pudim de Café</h4>
                            <span className="text-gray-900 text-sm md:text-[15px] ml-1">(para clientes sofisticados)</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <Star className="text-[#D97706] fill-[#D97706] shrink-0 mt-1" size={20} />
                        <div>
                            <h4 className="text-[#D97706] font-black text-base md:text-lg inline">Pudim de Ovomaltine</h4>
                            <span className="text-gray-900 text-sm md:text-[15px] ml-1">(criançada ama)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tropical Section - Verified Content */}
            <div>
                <div className="text-center mb-6 pt-6 border-t border-gray-100">
                    <h3 className="font-black text-lg md:text-xl text-black uppercase mb-1">RECEITAS TROPICAIS</h3>
                    <p className="text-gray-700 text-sm md:text-base font-normal">(sucesso no verão):</p>
                </div>

                <div className="space-y-6">
                    <div className="flex items-start gap-2">
                        <Sun className="text-[#D97706] fill-[#D97706] shrink-0 mt-1" size={20} />
                        <h4 className="text-[#D97706] font-black text-base md:text-lg">Pudim de Limão Siciliano</h4>
                    </div>

                    <div className="flex items-start gap-2">
                        <Sun className="text-[#D97706] fill-[#D97706] shrink-0 mt-1" size={20} />
                        <h4 className="text-[#D97706] font-black text-base md:text-lg">Pudim de Maracujá com Calda Natural</h4>
                    </div>

                    <div className="flex items-start gap-2">
                        <Sun className="text-[#D97706] fill-[#D97706] shrink-0 mt-1" size={20} />
                        <h4 className="text-[#D97706] font-black text-base md:text-lg">Pudim de Manga</h4>
                    </div>

                     <div className="flex items-start gap-2">
                        <Sun className="text-[#D97706] fill-[#D97706] shrink-0 mt-1" size={20} />
                        <h4 className="text-[#D97706] font-black text-base md:text-lg">Pudim de Coco Queimado</h4>
                    </div>

                     <div className="flex items-start gap-2">
                        <Sun className="text-[#D97706] fill-[#D97706] shrink-0 mt-1" size={20} />
                        <h4 className="text-[#D97706] font-black text-base md:text-lg">Pudim de Abacaxi</h4>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <Plus className="text-[#D97706] shrink-0" size={20} strokeWidth={3} />
                        <h4 className="text-[#D97706] font-black text-base md:text-lg">E muito mais!</h4>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- SEPARATE BONUS SECTION (RED BG) --- */}
      <section className="w-full bg-[#C62828] pb-16 pt-8 px-4 flex flex-col items-center gap-4">
        <div className="w-full max-w-4xl mb-8">
          <div className="bg-white text-[#C62828] px-4 py-4 rounded-t-2xl md:rounded-2xl shadow-lg mb-12 text-center mx-auto max-w-3xl transform hover:scale-[1.02] transition-transform">
             <h2 className="font-black text-xl md:text-3xl uppercase tracking-wider leading-tight">
               🎁 + R$ 269 EM BÔNUS EXCLUSIVOS <br className="hidden md:block"/>PARA ACELERAR SEUS RESULTADOS
             </h2>
          </div>

          <div className="flex flex-col gap-12 px-2 md:px-0 w-full">
            <BonusCard 
              image="https://i.ibb.co/5XF5xVWv/Design-sem-nome-6.png"
              title="1️⃣ MÉTODO INSTAGRAM DO ZERO PARA DOCES"
              oldPrice="De R$ 97"
              description="Passo a passo simples para criar seu perfil, postar certo e começar a receber encomendas na sua cidade — mesmo começando do zero."
            />
            
            <BonusCard 
              image="https://i.ibb.co/hShnzqn/Design-sem-nome-5.png"
              title="2️⃣ O SEGREDO DA CALDA PERFEITA"
              oldPrice="De R$ 57,85"
              description="Aprenda o ponto exato da calda que deixa o pudim brilhando, firme e com sabor profissional — sem amargar, sem queimar e sem errar."
            />

            <BonusCard 
              image="https://i.ibb.co/tPstXbS2/Design-sem-nome-8.png"
              title="3️⃣ 25 RECHEIOS GOURMET SEM FOGO"
              oldPrice="De R$ 47"
              description="Recheios prontos em minutos para aumentar seu ticket e vender versões premium dos seus doces. Mais variedade = mais lucro."
            />

            <BonusCard 
              image="https://i.ibb.co/zHZb13ZZ/Design-sem-nome-7.png"
              title="4️⃣ 5K+ RENDA COM BALAS CARAMELIZADAS"
              oldPrice="De R$ 77"
              description="Uma segunda fonte de renda simples, barata e altamente lucrativa para vender junto com seus pudins."
            />
          </div>
        </div>
      </section>

      {/* New Section: Onde Vender & Social Proof */}
      <section className="w-full bg-white py-12 px-4 flex flex-col items-center text-center">
        <div className="max-w-2xl w-full">
          <h2 className="text-black font-black text-2xl md:text-3xl mb-6">Onde vender?</h2>
          
          <div className="space-y-2 mb-6 font-bold text-[#C62828] text-lg md:text-xl">
             <p>- Grupos do bairro</p>
             <p>- Marketplace do Facebook</p>
             <p>- Instagram</p>
             <p>- Comércio local...</p>
          </div>

          <p className="text-[#C62828] font-bold text-lg md:text-xl mb-12">
            Logo o boca a boca faz o trabalho por você.
          </p>

          <div className="flex items-center justify-center gap-2 mb-8">
             <Smartphone className="w-8 h-8 text-black" strokeWidth={2.5} />
             <h2 className="text-black font-black text-xl md:text-2xl">O Que Diz Quem Já Comprou:</h2>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-6 items-center">
             <img 
               src="https://i.ibb.co/wZpTQT6s/instagram-comments-4.png" 
               alt="Depoimento 1" 
               className="rounded-xl shadow-lg border border-gray-200 w-full max-w-[280px] md:max-w-[300px]"
             />
             <img 
               src="https://i.ibb.co/vvB9bXbX/instagram-dm-1.png" 
               alt="Depoimento 2" 
               className="rounded-xl shadow-lg border border-gray-200 w-full max-w-[280px] md:max-w-[300px]"
             />
          </div>
        </div>
      </section>

      {/* Comparison Logic Section */}
      <section className="w-full bg-[#FFF9C4] py-16 px-4 flex flex-col items-center text-gray-900">
        <div className="w-full max-w-2xl space-y-8 text-left">
            
            <div className="space-y-2">
                <h3 className="font-black text-xl md:text-2xl text-black">
                    "E se eu gastar R$ 9,90 e não usar?"
                </h3>
                <p className="text-lg md:text-xl font-medium">Olha... R$ 9,90 é menos que:</p>
                <ul className="text-lg md:text-xl font-medium list-none space-y-1">
                    <li>1 combo no McDonald's</li>
                    <li>2 cafés na padaria</li>
                    <li>1 Uber curto</li>
                </ul>
            </div>

            <div className="space-y-2">
                <h3 className="font-black text-xl md:text-2xl text-black leading-tight">
                    Qual desses te dá a chance de faturar R$ 8.000 / R$10.000,00 por mês?
                </h3>
                <p className="text-lg md:text-xl italic font-medium">
                    (Sim, tenho alunas que faturam entre 10 mil e 12 mil no Natal).
                </p>
            </div>

            <p className="text-lg md:text-xl font-medium leading-relaxed">
                E ainda tem garantia de 7 dias. Você baixa, testa as receitas, e se não gostar, eu devolvo seu dinheiro. Zero risco.
            </p>

        </div>
      </section>

      {/* Offers Section */}
      <section className="w-full bg-white/40 py-16 flex flex-col items-center px-4">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* CARD 1: RECOMENDADO */}
          <div className="bg-[#FEF08A] rounded-[30px] md:rounded-[40px] overflow-hidden shadow-2xl relative border-4 border-white flex flex-col transform hover:-translate-y-1 transition-transform">
            <div className="bg-orange-600 text-white w-full py-2.5 font-black text-center uppercase tracking-[0.3em] shadow-lg animate-pulse">
              RECOMENDADO
            </div>
            <div className="p-4 md:p-10 flex-grow space-y-6 text-center">
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight tracking-[0.1em] uppercase">🚀 MÉTODO COMPLETO</h2>
              <p className="text-gray-900 font-black text-sm md:text-xl uppercase tracking-[0.2em] bg-white/30 py-1.5 rounded-lg border border-orange-200">TUDO DO PLANO ESSENCIAL +</p>
              <div className="bg-white/50 p-4 rounded-2xl border-2 border-orange-300 shadow-md">
                <p className="text-gray-950 font-black text-base md:text-xl flex items-center justify-center gap-2 tracking-[0.1em] uppercase">🎁 BÔNUS HOJE POR R$ 0</p>
                <p className="text-orange-700 font-bold text-[10px] md:text-base tracking-[0.1em] uppercase">+ R$269 EM BÔNUS LIBERADOS HOJE</p>
              </div>
              <div className="space-y-3 text-left max-w-[320px] mx-auto pt-2">
                {["O SEGREDO DA CALDA PERFEITA", "Método Instagram do Zero", "25 Recheios Gourmet", "5K+ Balas Caramelizadas"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-950">
                    <CheckCircle className="text-[#00E000] shrink-0" size={18} />
                    <span className="text-[15px] md:text-2xl font-black italic tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-6 space-y-1">
                <p className="text-[#ff0000] font-black line-through text-3xl md:text-5xl tracking-[0.1em]">De R$ 279</p>
                <p className="text-gray-900 text-sm md:text-lg font-black uppercase tracking-[0.3em]">POR APENAS</p>
                <p className="text-[#00E000] text-5xl md:text-[88px] font-black drop-shadow-lg tracking-tighter leading-none break-words">R$ 26,90</p>
              </div>
              <a href="https://ggcheckout.com.br/checkout/v2/gvXkc5OV7JUTsknDKFVI" className="block text-center shimmer-btn animate-pulse-grow w-full bg-[#00E000] hover:bg-[#00C000] text-white font-black py-4 md:py-7 rounded-2xl shadow-xl text-xl md:text-3xl transition-all uppercase tracking-widest mt-4 border-b-4 border-green-700">QUERO O MÉTODO COMPLETO</a>
            </div>
          </div>

          {/* CARD 2: ESSENCIAL */}
          <div className="bg-white rounded-[30px] md:rounded-[40px] overflow-hidden shadow-2xl border-4 border-[#00E000] flex flex-col transform hover:-translate-y-1 transition-transform">
            <div className="p-4 md:p-10 flex-grow space-y-6 text-center">
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight tracking-[0.1em] uppercase">🍮 PLANO ESSENCIAL</h2>
              <div className="pt-6 space-y-1">
                <p className="text-[#ff0000] font-black line-through text-2xl md:text-3xl tracking-[0.1em]">DE R$ 47,00</p>
                <p className="text-gray-900 text-sm md:text-lg font-black uppercase tracking-[0.3em]">POR APENAS:</p>
                <p className="text-[#00E000] text-5xl md:text-[80px] font-black tracking-tighter leading-none break-words">R$ 9,90</p>
              </div>
              <div className="py-5 border-y border-gray-100 bg-gray-50/50 rounded-xl">
                <div className="flex items-center justify-center gap-2 text-gray-950">
                  <CheckCircle className="text-[#00E000]" size={24} />
                  <span className="text-[15px] md:text-2xl font-black tracking-tight uppercase">30 Receitas que Mais Vendem</span>
                </div>
              </div>
              <button 
                onClick={() => setShowUpsellPopup(true)}
                className="shimmer-btn animate-pulse-grow w-full bg-[#00E000] hover:bg-[#00C000] text-white font-black py-4 md:py-7 rounded-2xl shadow-xl text-lg md:text-3xl transition-all uppercase tracking-widest mt-6 border-b-4 border-green-700"
              >
                QUERO COMEÇAR SIMPLES
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-white py-20 flex flex-col items-center border-y border-gray-100">
        <div className="w-full max-w-3xl px-6 space-y-12">
          <div className="bg-orange-600 text-white px-6 py-2 rounded-xl shadow-lg font-black text-xl md:text-3xl mx-auto w-fit uppercase border border-orange-700">❓ DÚVIDAS FREQUENTES (FAQ)</div>
          <div className="bg-white rounded-[32px] border-[2px] border-gray-200 shadow-sm p-4 md:p-10">
            <FAQItem 
              number={1}
              question="Preciso ter experiência na cozinha?" 
              answer="Não. As receitas são simples, explicadas passo a passo e feitas para iniciantes. Se você sabe misturar ingredientes, consegue fazer." 
            />
            <FAQItem 
              number={2}
              question="Preciso de forno ou fogão?" 
              answer="Não. Esse é justamente o diferencial. Todas as receitas são feitas sem forno, sem fogão e sem ovos." 
            />
            <FAQItem 
              number={3}
              question="Quanto preciso investir para começar?" 
              answer="Você pode começar com menos de R$ 30 em ingredientes e já produzir seus primeiros pudins para venda." 
            />
            <FAQItem 
              number={4}
              question="Em quanto tempo consigo vender?" 
              answer="Muitas alunas conseguem as primeiras vendas na mesma semana aplicando o método simples de divulgação." 
            />
            <FAQItem 
              number={5}
              question="Funciona mesmo na minha cidade?" 
              answer="Sim. Pudim é uma das sobremesas mais consumidas no Brasil. É um produto popular e fácil de vender em qualquer cidade." 
            />
            <FAQItem 
              number={6}
              question="Como recebo o material?" 
              answer="O acesso é imediato após a confirmação do pagamento. Você recebe no seu e-mail e pode acessar pelo celular ou computador." 
            />
            <FAQItem 
              number={7}
              question="E se eu não gostar?" 
              answer="Você tem 7 dias de garantia incondicional. Se achar que não é para você, pode pedir reembolso." 
            />
            <FAQItem 
              number={8}
              question="O que tem no Método Completo?" 
              answer={
                <ul className="list-disc pl-5 space-y-2 mt-2 font-bold">
                  <li>Além das 30 receitas, você recebe:</li>
                  <li className="text-orange-600">Método Instagram do Zero</li>
                  <li className="text-orange-600">25 Recheios Gourmet</li>
                  <li className="text-orange-600">5K+ Balas Caramelizadas</li>
                  <li className="text-orange-600">O Segredo da Calda Perfeita</li>
                  <li className="mt-2 text-gray-950 uppercase italic tracking-tighter">É um mini negócio estruturado.</li>
                </ul>
              } 
            />
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="w-full bg-white/40 py-20 flex flex-col items-center text-center">
        <h2 className="text-xl md:text-3xl font-black text-gray-950 uppercase tracking-[0.3em] mb-8">QUEM É  RENATA GOMES?</h2>
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-[40px] border-8 border-white shadow-2xl overflow-hidden mb-8 transform rotate-2">
          <img src="https://i.ibb.co/Gfmstf6h/confectioner-makes-macaroons-pastry-shop-979131-9239.avif" alt="Renata Gomes" className="w-full h-full object-cover" />
        </div>
        
        <div className="max-w-3xl px-6 space-y-6 text-gray-900 font-medium text-lg md:text-xl leading-relaxed">
          <p className="font-black text-orange-600 text-xl md:text-3xl">
            Sou a desempregada que transformou a sua vida vendendo pudins sem forno!
          </p>
          <p>
            Tenho realizado meus sonhos, e com a ajuda de Deus comprei a minha casa.
          </p>
          <p>
            Ajudo os meus pais e ano que vem darei entrada no meu carro, se Deus quiser...<br/>
            <span className="font-black text-gray-950">Tudo graças ao Pudim Sem Forno!</span>
          </p>
          <p className="font-black text-gray-950 text-lg md:text-2xl uppercase">
            Acredite em você e transforme a sua realidade também!
          </p>
        </div>

        <a href="https://ggcheckout.com.br/checkout/v2/gvXkc5OV7JUTsknDKFVI" className="block text-center mt-10 animate-pulse-grow shimmer-btn w-full max-w-2xl bg-[#00E000] text-white font-black py-6 rounded-full shadow-2xl text-xl md:text-3xl uppercase border-b-4 border-green-700">EU QUERO MELHORAR DE VIDA!</a>
      </section>

      {/* Footer */}
      <footer className="w-full py-10 text-center text-[8px] md:text-xs text-gray-400 font-black uppercase tracking-[0.4em] bg-white/80 border-t border-gray-100">
        © TODOS OS DIREITOS RESERVADOS
      </footer>
    </div>
  );
};

export default App;