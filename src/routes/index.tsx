import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Wallet,
  ShoppingCart,
  LineChart,
  Headphones,
  Check,
  Plus,
  Minus,
  Star,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: QuikLanding,
  head: () => ({
    meta: [
      { title: "Quik — Venda mais. Receba na hora. Escale sem limite." },
      {
        name: "description",
        content:
          "A Quik é a plataforma de pagamentos para infoprodutos. Aprovação máxima, Pix instantâneo e checkout que converte.",
      },
    ],
  }),
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-stagger] > *").forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return ref;
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-display text-2xl font-bold tracking-tight">
          quik<span className="text-yellow">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#por-que" className="hover:text-yellow transition">Plataforma</a>
          <a href="#como" className="hover:text-yellow transition">Como funciona</a>
          <a href="#precos" className="hover:text-yellow transition">Preços</a>
          <a href="#faq" className="hover:text-yellow transition">FAQ</a>
        </nav>
        <a href="#cta" className="btn-yellow text-sm !py-2.5 !px-5">
          Criar conta <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-chip]", { y: 20, opacity: 0, duration: 0.6 })
        .from("[data-hero-title] span", { y: 80, opacity: 0, duration: 1, stagger: 0.08 }, "-=0.2")
        .from("[data-hero-sub]", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
        .from("[data-hero-cta]", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
        .from("[data-hero-visual]", { scale: 0.9, opacity: 0, duration: 1.1 }, "-=0.7");

      gsap.to("[data-hero-bg]", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden">
      <div data-hero-bg className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-yellow/10 blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          <span data-hero-chip className="chip mb-8">
            <Zap className="w-3.5 h-3.5" /> A plataforma que mais cresce no mercado digital
          </span>
          <h1 data-hero-title className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95]">
            <span className="inline-block">Venda mais.</span>{" "}
            <span className="inline-block text-yellow">Receba na hora.</span>{" "}
            <span className="inline-block">Escale sem limite.</span>
          </h1>
          <p data-hero-sub className="mt-8 text-lg md:text-xl text-white/65 max-w-2xl mx-auto">
            A Quik é a plataforma de pagamentos feita para quem leva o digital a sério. Simples,
            rápida e segura — do primeiro produto ao primeiro milhão.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a data-hero-cta href="#cta" className="btn-yellow">
              Criar minha conta grátis <ArrowRight className="w-4 h-4" />
            </a>
            <a data-hero-cta href="#como" className="btn-ghost">
              Ver como funciona
            </a>
          </div>
        </div>

        <div
          data-hero-visual
          className="relative mt-20 mx-auto max-w-5xl aspect-[16/9] rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent overflow-hidden glow-yellow"
        >
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="font-display text-7xl md:text-9xl font-bold text-yellow leading-none">
                R$ 1.284<span className="text-white">,90</span>
              </div>
              <div className="mt-3 text-sm text-white/50 tracking-widest uppercase">
                Pix recebido · há 2 segundos
              </div>
            </div>
          </div>
          <div className="absolute top-6 left-6 flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-white/20" />
            <span className="w-3 h-3 rounded-full bg-white/20" />
            <span className="w-3 h-3 rounded-full bg-yellow" />
          </div>
          <div className="absolute bottom-6 right-6 text-xs text-white/40 font-mono">dashboard.quik.com</div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: "+R$ 50M", l: "processados" },
    { v: "+12.000", l: "produtores ativos" },
    { v: "99,9%", l: "uptime garantido" },
    { v: "5 min", l: "pra começar a vender" },
  ];
  return (
    <section className="border-y border-white/10 bg-[color:var(--surface)]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8" data-stagger>
        {stats.map((s) => (
          <div key={s.l} className="text-center md:text-left">
            <div className="font-display text-3xl md:text-5xl font-bold text-yellow">{s.v}</div>
            <div className="text-sm text-white/55 mt-1">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyQuik() {
  const cards = [
    { icon: Wallet, t: "Aprovação máxima", d: "Nosso motor antifraude aprova mais vendas sem abrir mão da segurança. Menos recusa, mais dinheiro no seu bolso." },
    { icon: Zap, t: "Pagamento instantâneo", d: "Receba via Pix em segundos. Seu saldo disponível imediatamente, sem esperar dias ou semanas." },
    { icon: ShoppingCart, t: "Checkout que converte", d: "Checkout otimizado para mobile, com um clique e sem fricção. Menos abandono, mais conversão — garantido." },
    { icon: ShieldCheck, t: "Segurança de verdade", d: "Infraestrutura com criptografia de ponta, certificação PCI DSS e antifraude inteligente. Você vende, nós protegemos." },
    { icon: LineChart, t: "Dashboard em tempo real", d: "Acompanhe cada venda, cada clique e cada conversão no momento em que acontece. Sem atraso, sem achismo." },
    { icon: Headphones, t: "Suporte que resolve", d: "Time humano, disponível, que responde de verdade. Porque problema com dinheiro não pode esperar." },
  ];
  return (
    <section id="por-que" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <span className="chip mb-6" data-reveal>Por que a Quik</span>
          <h2 data-reveal className="font-display text-4xl md:text-6xl font-bold leading-[1.05]">
            Chega de plataforma que <span className="text-yellow">complica</span> o que deveria ser simples.
          </h2>
          <p data-reveal className="mt-6 text-lg text-white/60">
            Enquanto outras plataformas cobram taxas escondidas e travam seu dinheiro, a Quik foi
            construída do zero pra você vender com liberdade.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden" data-stagger>
          {cards.map(({ icon: Icon, t, d }, idx) => (
            <div
              key={t}
              className="group bg-[color:var(--surface)] p-8 hover:bg-[color:var(--surface-2)] transition-colors relative"
            >
              <div className="w-12 h-12 rounded-xl bg-yellow/10 border border-yellow/30 flex items-center justify-center mb-6 group-hover:bg-yellow group-hover:border-yellow transition-all">
                <Icon className="w-5 h-5 text-yellow group-hover:text-black transition-colors" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{t}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{d}</p>
              <div className="absolute top-6 right-6 text-white/10 font-mono text-xs">0{idx + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Awards() {
  const awards = [
    "🥇 Plataforma Revelação 2024 — InfoCommerce Awards",
    "🏆 Melhor Gateway para Infoprodutos — Summit Digital Brasil",
    "⭐ Top 3 Plataformas de Pagamento — Ranking Mercado Digital",
    "🚀 Startup de Alto Impacto — Aceleração Tech BR",
    "💎 Melhor Experiência de Checkout — Prêmio UX Finance 2024",
    "🔥 Plataforma Mais Bem Avaliada — Comunidade Lançadores BR",
  ];
  const loop = [...awards, ...awards];
  return (
    <section className="py-32 border-y border-white/10 bg-[color:var(--surface)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-14">
        <h2 className="font-display text-4xl md:text-5xl font-bold" data-reveal>
          Reconhecimento de quem <span className="text-yellow">entende</span> do mercado
        </h2>
        <p className="mt-4 text-white/60 max-w-2xl mx-auto" data-reveal>
          A Quik não é só mais uma plataforma — é a escolha de quem já chegou lá.
        </p>
      </div>
      <div className="relative">
        <div className="marquee gap-6 px-6">
          {loop.map((a, i) => (
            <div
              key={i}
              className="shrink-0 px-8 py-6 rounded-2xl border border-white/10 bg-black/40 text-base md:text-lg font-medium whitespace-nowrap hover:border-yellow transition-colors"
            >
              {a}
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[color:var(--surface)] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[color:var(--surface)] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { q: "Migrei pra Quik há 3 meses e minha taxa de aprovação subiu 18%. Simples assim.", a: "Lucas M.", r: "Produtor digital · R$ 200k/mês" },
    { q: "Passei anos pagando taxa absurda em outra plataforma. Na Quik, configurei tudo em menos de 10 minutos e já estava vendendo.", a: "Fernanda R.", r: "Mentora de negócios" },
    { q: "O suporte da Quik salvou meu lançamento numa sexta à noite. Isso não tem preço.", a: "Rodrigo T.", r: "Especialista em tráfego" },
  ];
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-4xl md:text-6xl font-bold max-w-3xl" data-reveal>
          Quem usou, <span className="text-yellow">não volta</span> pra outra.
        </h2>
        <div className="mt-16 grid md:grid-cols-3 gap-6" data-stagger>
          {items.map((t) => (
            <div key={t.a} className="p-8 rounded-2xl border border-white/10 bg-[color:var(--surface)] flex flex-col">
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow text-yellow" />
                ))}
              </div>
              <p className="text-lg leading-relaxed text-white/85 flex-1">"{t.q}"</p>
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="font-semibold">{t.a}</div>
                <div className="text-sm text-white/50">{t.r}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Crie sua conta", d: "Cadastro gratuito em menos de 5 minutos. Sem burocracia, sem cartão de crédito." },
    { n: "02", t: "Configure seu produto", d: "Adicione seu produto, defina o preço e personalize seu checkout em minutos." },
    { n: "03", t: "Venda e receba", d: "Compartilhe o link, venda para o Brasil inteiro e receba direto na sua conta." },
  ];
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-step]", {
        x: -60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section id="como" ref={ref} className="py-32 bg-[color:var(--surface)] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="chip mb-6">Como funciona</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            Em <span className="text-yellow">3 passos</span>, você já está vendendo.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 relative">
          {steps.map((s, i) => (
            <div data-step key={s.n} className="relative p-8 rounded-2xl border border-white/10 bg-black">
              <div className="font-display text-7xl font-bold text-yellow/20 mb-4">{s.n}</div>
              <h3 className="font-display text-2xl font-semibold mb-3">{s.t}</h3>
              <p className="text-white/55">{s.d}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 w-8 h-8 text-yellow z-10" />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-14">
          <a href="#cta" className="btn-yellow">
            Quero começar agora <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="precos" className="py-32">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <span className="chip mb-6" data-reveal>Preços</span>
        <h2 className="font-display text-4xl md:text-6xl font-bold" data-reveal>
          Transparência que você <span className="text-yellow">não encontra</span> em outro lugar.
        </h2>
        <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto" data-reveal>
          Sem mensalidade. Sem taxa de adesão. Sem surpresa no boleto. Você só paga quando vende.
          Simples assim.
        </p>

        <div data-reveal className="mt-16 p-10 md:p-14 rounded-3xl bg-yellow text-black relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-black/5" />
          <div className="relative">
            <div className="font-display text-6xl md:text-8xl font-bold leading-none">0%</div>
            <div className="mt-3 text-lg font-semibold">de mensalidade · pra sempre</div>
            <div className="mt-10 p-6 rounded-2xl bg-black text-white max-w-xl mx-auto">
              <div className="text-sm uppercase tracking-widest text-yellow mb-2">💡 Dica</div>
              <p className="text-base">
                Quanto mais você cresce, menores ficam suas taxas. Na Quik, seu sucesso é
                recompensado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Security() {
  const items = [
    "Certificação PCI DSS nível 1",
    "Criptografia SSL 256 bits",
    "Antifraude com machine learning",
    "Conformidade total com LGPD",
    "Monitoramento 24/7",
    "Backup automático de dados",
  ];
  return (
    <section className="py-32 bg-[color:var(--surface)] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="chip mb-6" data-reveal>Autoridade</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight" data-reveal>
            Sua operação <span className="text-yellow">protegida</span> do início ao fim.
          </h2>
          <p className="mt-6 text-white/60 text-lg" data-reveal>
            Não é só promessa. É infraestrutura real.
          </p>
          <blockquote
            data-reveal
            className="mt-10 p-6 border-l-4 border-yellow bg-black/40 italic text-white/80"
          >
            "A Quik processa transações com o mesmo padrão de segurança dos grandes bancos digitais
            — porque você merece o mesmo nível de proteção."
          </blockquote>
        </div>
        <div className="grid sm:grid-cols-2 gap-4" data-stagger>
          {items.map((i) => (
            <div key={i} className="flex items-start gap-3 p-5 rounded-xl border border-white/10 bg-black/40">
              <div className="w-6 h-6 rounded-full bg-yellow flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />
              </div>
              <span className="text-white/85 font-medium">{i}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "É grátis pra começar?", a: "Sim. Você cria sua conta, configura seus produtos e só paga uma taxa sobre o que vender. Sem mensalidade, sem pegadinha." },
    { q: "Quanto tempo leva pra receber?", a: "Vendas via Pix caem na sua conta em segundos. Cartão de crédito segue o ciclo padrão da operadora, com as melhores condições do mercado." },
    { q: "Preciso ter CNPJ?", a: "Não. Você pode começar com CPF mesmo. Quando seu negócio crescer, a migração é simples." },
    { q: "A Quik funciona para infoprodutos e produtos físicos?", a: "Sim. Cursos, mentorias, e-books, assinaturas, produtos físicos — a Quik suporta todos os formatos." },
    { q: "Tem suporte se eu tiver problema?", a: "Sim, e é suporte humano. Nosso time está disponível para resolver, não só para responder com mensagem automática." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="chip mb-6" data-reveal>FAQ</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold" data-reveal>
            Respostas rápidas para quem <span className="text-yellow">não tem tempo</span> a perder.
          </h2>
        </div>
        <div className="space-y-3" data-stagger>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <button
                key={i}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`w-full text-left p-6 rounded-2xl border transition-all ${
                  isOpen ? "border-yellow bg-yellow/5" : "border-white/10 bg-[color:var(--surface)] hover:border-white/30"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-lg font-semibold">{f.q}</span>
                  <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${isOpen ? "bg-yellow text-black" : "bg-white/5 text-white"}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </div>
                <div
                  className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden text-white/65">{f.a}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="cta" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-yellow/20 blur-[180px] pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-5xl md:text-7xl font-bold leading-[1.02]" data-reveal>
          Seu próximo lançamento <span className="text-yellow">começa agora.</span>
        </h2>
        <p className="mt-6 text-lg text-white/65 max-w-2xl mx-auto" data-reveal>
          Junte-se a milhares de produtores que escolheram a plataforma mais simples, rápida e
          segura do mercado digital brasileiro.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4" data-reveal>
          <a href="#" className="btn-yellow">
            Criar minha conta — é grátis <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#" className="btn-ghost">Falar com um especialista</a>
        </div>
        <p className="mt-6 text-sm text-white/45" data-reveal>
          🔒 Sem cartão de crédito · Configuração em 5 minutos · Suporte humano incluído
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-display text-2xl font-bold">
          quik<span className="text-yellow">.</span>
        </div>
        <div className="text-sm text-white/40">
          © {new Date().getFullYear()} Quik. A plataforma de pagamentos para quem leva o digital a sério.
        </div>
        <div className="flex gap-6 text-sm text-white/50">
          <a href="#" className="hover:text-yellow">Termos</a>
          <a href="#" className="hover:text-yellow">Privacidade</a>
          <a href="#" className="hover:text-yellow">Contato</a>
        </div>
      </div>
    </footer>
  );
}

function QuikLanding() {
  const ref = useReveal();
  return (
    <div ref={ref} className="min-h-screen bg-black text-white">
      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
        rel="stylesheet"
      />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <WhyQuik />
        <Awards />
        <Testimonials />
        <HowItWorks />
        <Pricing />
        <Security />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
