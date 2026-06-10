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
  Bell,
  DollarSign,
  Lock,
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

const isServer = typeof window === "undefined";

if (!isServer) {
  gsap.registerPlugin(ScrollTrigger);
}



function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isServer || !ref.current) return;
    const ctx = gsap.context(() => {
      // General Reveal
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        // Skip elements that are part of titles (h1, h2, h3) to avoid conflicts with typewriter effect
        if (el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3') {
          return;
        }
        
        gsap.from(el, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 95%" },
        });
      });

      // Typewriter Effect for all Titles
      gsap.utils.toArray<HTMLElement>("h1, h2, h3").forEach((title) => {
        if (title.hasAttribute("data-no-typewriter")) return;
        // Skip titles in the specialized scroll sections if they already have custom animations
        // but we'll apply it widely first.
        const text = title.textContent || "";
        title.innerHTML = "";
        
        // Split into words so words never break across lines; animate chars within
        const words = text.split(/(\s+)/);
        words.forEach(word => {
          if (/^\s+$/.test(word)) {
            title.appendChild(document.createTextNode(word));
            return;
          }
          const wordSpan = document.createElement("span");
          wordSpan.style.display = "inline-block";
          wordSpan.style.whiteSpace = "nowrap";
          word.split("").forEach(char => {
            const span = document.createElement("span");
            span.textContent = char;
            span.style.opacity = "0";
            span.style.display = "inline-block";
            wordSpan.appendChild(span);
          });
          title.appendChild(wordSpan);
        });

        gsap.to(title.querySelectorAll("span"), {
          opacity: 1,
          stagger: 0.02,
          duration: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: title,
            start: "top 95%",
            toggleActions: "play none none reverse",
          }
        });
      });

      // Number Counter Animation
      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
        const target = parseFloat(el.getAttribute("data-counter") || "0");
        const suffix = el.getAttribute("data-suffix") || "";
        const prefix = el.getAttribute("data-prefix") || "";
        const decimals = el.getAttribute("data-decimals") === "1" ? 1 : 0;
        
        const obj = { value: 0 };
        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            toggleActions: "play none none none"
          },
          onUpdate: () => {
            el.textContent = prefix + obj.value.toFixed(decimals).replace(".", ",") + suffix;
          }
        });
      });

      // Stagger
      gsap.utils.toArray<HTMLElement>("[data-stagger] > *").forEach((el, i) => {
        gsap.from(el, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 95%" },
        });
      });

      // Interactive Hover Effects (everything with data-interactive)
      gsap.utils.toArray<HTMLElement>("[data-interactive]").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(el, { scale: 1.05, duration: 0.4, ease: "power2.out" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { scale: 1, duration: 0.4, ease: "power2.out" });
        });
      });

      // Removed magnetic button movement as requested
      // The animation is now handled via CSS classes for the flip effect.
    }, ref);
    return () => ctx.revert();
  }, []);
  return ref;
}


function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/5 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <img 
            src="/logoquik.svg" 
            alt="Quik Logo" 
            className="h-8 w-auto transition-transform duration-500 group-hover:scale-110" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://i.ibb.co/Vp8p36C/logo-quik.png";
            }} 
          />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#por-que" className="hover:text-yellow hover:-translate-y-1 transition-all">Plataforma</a>
          <a href="#como" className="hover:text-yellow hover:-translate-y-1 transition-all">Como funciona</a>
          <a href="#precos" className="hover:text-yellow hover:-translate-y-1 transition-all">Preços</a>
          <a href="#faq" className="hover:text-yellow hover:-translate-y-1 transition-all">FAQ</a>
        </nav>
        <a href="#cta" className="btn-yellow text-sm !py-2.5 !px-5 whitespace-nowrap">
          <span className="btn-flip-content">Criar conta <ArrowRight className="w-4 h-4" /></span>
          <span className="btn-flip-hidden">Criar conta <ArrowRight className="w-4 h-4" /></span>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isServer) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-chip]", { y: 20, opacity: 0, duration: 0.6, clearProps: "all" })
        .from("[data-hero-sub]", { y: 20, opacity: 0, duration: 0.7, clearProps: "all" }, "-=0.5")
        .from("[data-hero-cta]", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, clearProps: "all" }, "-=0.4")
        .from("[data-hero-visual]", { scale: 0.9, opacity: 0, duration: 1.1, clearProps: "all" }, "-=0.7");

      gsap.to("[data-hero-bg]", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      });

    }, heroRef);
    return () => ctx.revert();
  }, []);


  const HeroContent = ({ className = "", isSpotlight = false }: { className?: string, isSpotlight?: boolean }) => (
    <div className={`text-center max-w-4xl mx-auto ${className}`}>
      <span data-hero-chip className={`chip mb-8 ${isSpotlight ? 'border-black/20 text-black/80' : ''}`}>
        <Zap className="w-3.5 h-3.5" /> A plataforma que mais cresce no mercado digital
      </span>
      <h1 data-no-typewriter className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
        <span className="block">Venda mais.</span>
        <span className="block">Receba na hora.</span>
        <span className="block hero-shine">Escale sem limite.</span>
      </h1>
      <p data-hero-sub className={`mt-8 text-lg md:text-xl max-w-2xl mx-auto ${isSpotlight ? 'text-black/70' : 'opacity-65'}`}>
        A Quik é a plataforma de pagamentos feita para quem leva o digital a sério. Simples,
        rápida e segura do primeiro produto ao primeiro milhão.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a 
          data-hero-cta 
          href="#cta" 
          className={`btn-yellow w-full sm:w-[320px] justify-center shadow-2xl ${isSpotlight ? 'bg-black text-yellow border-black' : ''}`}
        >
          <span className="btn-flip-content">Criar minha conta grátis <ArrowRight className="w-4 h-4" /></span>
          <span className="btn-flip-hidden">Criar minha conta grátis <ArrowRight className="w-4 h-4" /></span>
        </a>
        <a 
          data-hero-cta 
          href="#como" 
          className={`btn-ghost w-full sm:w-[320px] justify-center ${isSpotlight ? 'border-black/20 text-black hover:bg-black/5' : ''}`}
        >
          <span className="btn-flip-content">Ver como funciona</span>
          <span className="btn-flip-hidden">Ver como funciona</span>
        </a>
      </div>
    </div>
  );

  return (
    <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden group/hero">
      <div className="absolute inset-x-0 top-0 h-[640px] pointer-events-none [mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)]" aria-hidden="true">
        <div className="hero-aurora" />
        <div data-hero-bg className="absolute inset-0 grid-bg-animated opacity-80" />
      </div>
      
      {/* Background Hero Content (White Text) */}
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <HeroContent className="text-white" />
      </div>



      <div className="relative max-w-7xl mx-auto px-6 z-30">
        <div
          data-hero-visual
          className="relative mt-20 mx-auto w-full max-w-none overflow-visible flex justify-center"
        >
          <div className="relative w-full max-w-7xl aspect-video">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain mix-blend-screen opacity-90 transition-opacity duration-700 hover:opacity-100"
            >
              <source src="/formula1.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: "50", l: "processados", prefix: "+R$ ", suffix: "M" },
    { v: "12000", l: "produtores ativos", prefix: "+", suffix: "" },
    { v: "99.9", l: "uptime garantido", prefix: "", suffix: "%", decimals: 1 },
    { v: "5", l: "pra começar a vender", prefix: "", suffix: " min" },
  ];
  return (
    <section className="border-y border-white/10 bg-[color:var(--surface)]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8" data-stagger>
        {stats.map((s) => (
          <div key={s.l} data-interactive className="text-center md:text-left group hover:-translate-y-2 transition-transform duration-500">
            <div 
              className="font-display text-3xl md:text-5xl font-bold text-yellow"
              data-counter={s.v}
              data-prefix={s.prefix}
              data-suffix={s.suffix}
              data-decimals={s.decimals || 0}
            >
              0
            </div>
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
    { icon: ShoppingCart, t: "Checkout que converte", d: "Checkout otimizado para mobile, com um clique e sem fricção. Menos abandono, mais conversão garantido." },
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
            Chega de plataforma que <span className="text-yellow" data-no-typewriter>complica</span> o que deveria ser simples.
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
              data-interactive
              className="group bg-[color:var(--surface)] p-8 hover:bg-[color:var(--surface-2)] transition-all duration-500 relative perspective-1000"
            >
              <div className="w-12 h-12 rounded-xl bg-yellow/10 border border-yellow/30 flex items-center justify-center mb-6 group-hover:bg-yellow group-hover:border-yellow group-hover:rotate-12 transition-all duration-500">
                <Icon className="w-5 h-5 text-yellow group-hover:text-black transition-colors" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-yellow transition-colors">{t}</h3>
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
    "⭐ Top 10 Plataformas de Pagamento — Ranking Mercado Digital",
    "🚀 Startup de Alto Impacto — Aceleração Tech BR",
    "💎 Melhor Experiência de Checkout — Prêmio UX Finance 2024",
    "🔥 Plataforma Mais Bem Avaliada — Comunidade Lançadores BR",
  ];
  const loop = [...awards, ...awards];
  return (
    <section id="premios" className="py-32 border-y border-white/10 bg-[color:var(--surface)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-14">
        <h2 className="font-display text-4xl md:text-5xl font-bold" data-reveal>
          Reconhecimento de quem <span className="text-yellow" data-no-typewriter>entende</span> do mercado
        </h2>
        <p className="mt-4 text-white/60 max-w-2xl mx-auto" data-reveal>
          A Quik não é só mais uma plataforma é a escolha de quem já chegou lá.
        </p>
      </div>
      <div className="relative">
        <div className="marquee gap-6 px-6">
          {loop.map((a, i) => (
            <div
              key={i}
              data-interactive
              className="shrink-0 px-8 py-6 rounded-2xl border border-white/10 bg-black/40 text-base md:text-lg font-medium whitespace-nowrap hover:border-yellow hover:scale-110 transition-all duration-500"
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

function NextSteps() {
  const steps = [
    { 
      t: "Infraestrutura escalável", 
      d: "Tecnologia de ponta pronta para suportar picos de tráfego extremos em lançamentos.",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
    },
    { 
      t: "Conversão otimizada", 
      d: "Checkouts testados e validados para garantir a menor fricção e a maior conversão.",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
    },
    { 
      t: "Ecossistema completo", 
      d: "Todas as ferramentas que você precisa em um só lugar, integradas e prontas para usar.",
      img: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop"
    },
    { 
      t: "Dados em tempo real", 
      d: "Analytics profundo para você tomar decisões baseadas em números, não em achismos.",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
  ];

  return (
    <section className="py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-4xl md:text-6xl font-bold max-w-4xl mb-20" data-reveal>
          Seu próximo passo no digital acontece aqui. <span className="text-yellow" data-no-typewriter>E o próximo. E o próximo…</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <div 
              key={i} 
              data-reveal
              className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-out hover:flex-[1.5] flex-1 bg-[color:var(--surface)] border border-white/10"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={step.img} 
                  alt={step.t}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-all duration-700 ease-out bg-[#1A1A1A]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
              
              <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                <div className="mb-4 w-10 h-10 rounded-full bg-yellow text-black flex items-center justify-center font-bold text-sm">
                  0{i + 1}
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-yellow transition-colors duration-300">
                  {step.t}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {step.d}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center" data-reveal>
          <a href="#cta" className="btn-yellow text-xl !px-12 !py-6 group">
            <span className="btn-flip-content">Criar minha conta agora <ArrowRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" /></span>
            <span className="btn-flip-hidden">Criar minha conta agora <ArrowRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" /></span>
          </a>
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
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isServer || !containerRef.current || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const horizontalSection = containerRef.current;
      const totalWidth = horizontalSection!.scrollWidth;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth + window.innerWidth / 2}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress > 0.05 && self.progress < 0.95) {
              document.body.classList.add("light-mode");
            } else {
              document.body.classList.remove("light-mode");
            }
          }
        }
      });

      tl.to(horizontalSection, {
        x: () => -(totalWidth - window.innerWidth),
        ease: "none"
      });

      // Animate steps 1 by 1
      gsap.utils.toArray<HTMLElement>(".step-card").forEach((card, i) => {
        const number = card.querySelector(".step-number");
        const title = card.querySelector(".step-title");
        
        gsap.to(number, {
          color: "#FEFF00",
          scale: 1.1,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: "left 60%",
            end: "left 40%",
            scrub: true,
          }
        });


        gsap.to(title, {
          color: "#FEFF00",
          duration: 0.5,
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: "left 60%",
            end: "left 40%",
            scrub: true,
          }
        });
      });

      // Image coming towards screen animation at the end
      if (imageRef.current) {
        gsap.fromTo(imageRef.current, 
          { scale: 0.1, opacity: 0, rotateX: 45, y: 100 },
          { 
            scale: 1, 
            opacity: 1, 
            rotateX: 0,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".cta-trigger",
              containerAnimation: tl,
              start: "left 90%",
              end: "left 10%",
              scrub: true,
            }
          }
        );
      }


    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="como" ref={sectionRef} className="relative h-screen overflow-hidden flex items-center bg-[color:var(--surface)] transition-colors duration-500">
      <div ref={containerRef} className="flex items-center gap-12 px-[10vw] min-w-max h-full">
        <div className="w-[40vw] shrink-0">
          <span className="chip mb-6">Como funciona</span>
          <h2 className="font-display text-4xl md:text-7xl font-bold">
            Em <span className="text-yellow" data-no-typewriter>3 passos</span>,<br />você já está vendendo.
          </h2>
        </div>
        {steps.map((s, i) => (
          <div key={s.n} data-interactive className="step-card relative p-12 w-[350px] md:w-[450px] rounded-3xl border border-white/10 bg-black/5 backdrop-blur-sm group hover:border-yellow/50 transition-all duration-500">
            <div className="step-number font-display text-8xl font-bold text-yellow/10 mb-4 transition-colors">{s.n}</div>
            <h3 className="step-title font-display text-3xl font-semibold mb-4 transition-colors">{s.t}</h3>
            <p className="text-white/55 text-lg leading-relaxed">{s.d}</p>
          </div>
        ))}
        
        <div className="cta-trigger w-[60vw] shrink-0 flex flex-col items-center justify-center relative px-20 perspective-1000">
          <div ref={imageRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 bg-yellow rounded-full glow-yellow flex items-center justify-center p-8">
              <img 
                src="/logoquik.svg" 
                alt="Quik Logo" 
                className="w-full h-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://i.ibb.co/Vp8p36C/logo-quik.png";
                }}
              />
            </div>
          </div>
          <div className="relative z-10 text-center">
            <h3 className="font-display text-5xl md:text-7xl font-bold mb-8">Pronto para começar?</h3>
            <a href="#cta" className="btn-yellow text-2xl !px-16 !py-8">
              <span className="btn-flip-content">Quero começar agora <ArrowRight className="w-8 h-8" /></span>
              <span className="btn-flip-hidden">Quero começar agora <ArrowRight className="w-8 h-8" /></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


function GatewayAwards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  
  const awards = [
    {
      title: "Plataforma Revelação 2024",
      org: "InfoCommerce Awards",
      img: "/awards/award1.png",
    },
    {
      title: "Melhor Gateway",
      org: "Summit Digital Brasil",
      img: "/awards/award2.png",
    },
    {
      title: "Top 3 Plataformas",
      org: "Ranking Mercado Digital",
      img: "/awards/award3.png",
    },
    {
      title: "Startup de Alto Impacto",
      org: "Aceleração Tech BR",
      img: "/awards/award4.png",
    },
  ];

  useEffect(() => {
    if (isServer || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = itemsRef.current;
      const totalSteps = items.length;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalSteps * 45}%`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        }
      });

      items.forEach((item, i) => {
        // Reset states
        gsap.set(item, { scale: 0.5, opacity: 0, z: -500, filter: "blur(10px)" });

        // Animation sequence
        tl.to(item, {
          scale: 1,
          opacity: 1,
          z: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.inOut",
        })
        .to(item, {
          scale: 1.5,
          opacity: 0,
          z: 500,
          filter: "blur(20px)",
          duration: 1,
          ease: "power2.inOut",
        }, "+=0.5");
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen bg-black overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-yellow/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header - Fixed during the section scroll */}
      <div className="relative z-20 text-center mb-6 pointer-events-none">
        <span className="chip mb-2 inline-block" data-reveal>Reconhecimento & Conquistas</span>
        <h2 className="awards-title font-display text-3xl md:text-5xl font-bold text-white">
          Sua Jornada <span className="text-yellow" data-no-typewriter>Premiada</span>
        </h2>
        <p className="mt-2 text-white/50 max-w-xl mx-auto text-xs md:text-sm px-6">
          Alcance novas metas de faturamento e seja recompensado com prêmios exclusivos que celebram o sucesso e a escala do seu negócio digital.
        </p>
      </div>

      {/* Awards Showcase Area */}
      <div className="relative w-full max-w-4xl flex-1 flex items-center justify-center perspective-2000">
        {awards.map((award, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) itemsRef.current[i] = el;
            }}
            className="absolute inset-0 flex flex-col items-center justify-center p-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative group flex items-center justify-center w-full h-full">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-yellow/10 blur-3xl rounded-full scale-75 group-hover:scale-110 transition-transform duration-700" />
              
              {/* Image Container */}
              <div className="relative w-full h-full max-h-[60vh] flex items-center justify-center">
                <img 
                  src={award.img} 
                  alt={award.title}
                  className="max-w-full max-h-full object-contain drop-shadow-[0_0_30px_rgba(254,255,0,0.2)]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RealTimeNotifications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [activeNotifications, setActiveNotifications] = useState<any[]>([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const salesData = [
    { name: "João M.", value: "R$ 197,00" },
    { name: "Ana Paula S.", value: "R$ 497,90" },
    { name: "Marcos V.", value: "R$ 97,00" },
    { name: "Beatriz C.", value: "R$ 1.290,00" },
    { name: "Ricardo F.", value: "R$ 297,00" },
    { name: "Juliana L.", value: "R$ 147,00" },
    { name: "Pedro H.", value: "R$ 897,00" },
  ];

  useEffect(() => {
    if (isServer || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(phoneRef.current, {
        y: -20,
        rotationZ: 5,
        rotationY: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      const interval = setInterval(() => {
        const randomSale = salesData[Math.floor(Math.random() * salesData.length)];
        const id = Date.now();
        const newNotif = { ...randomSale, id };
        
        setActiveNotifications(prev => [newNotif, ...prev].slice(0, 5));
        
        setTimeout(() => {
          const el = document.getElementById(`notif-${id}`);
          if (el) {
            gsap.fromTo(el, 
              { opacity: 0, x: 50, scale: 0.8 },
              { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
            );
          }
        }, 10);
      }, 3000);

      return () => clearInterval(interval);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const formattedTime = time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const formattedDate = time.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden bg-black">
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1">
          <span className="chip mb-6" data-reveal>Tempo Real</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-8" data-reveal>
            Sinta o prazer de <span className="text-yellow" data-no-typewriter>vender a cada segundo.</span>
          </h2>
          <p className="text-xl text-white/60 leading-relaxed mb-10" data-reveal>
            Receba notificações instantâneas de cada venda realizada. Nossa tecnologia entrega o feedback que você precisa para manter o foco na escala.
          </p>
          
          <div className="space-y-6" data-stagger>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-yellow/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-yellow flex items-center justify-center shrink-0 border border-yellow/20 group-hover:scale-110 transition-all duration-500">
                <Bell className="w-6 h-6 text-black transition-colors" />
              </div>
              <div>
                <h4 className="font-display text-xl font-bold mb-2">Push que dá lucro</h4>
                <p className="text-white/50">Notificações otimizadas que te mostram exatamente o que importa: dinheiro no bolso.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-yellow/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-yellow flex items-center justify-center shrink-0 border border-yellow/20 group-hover:scale-110 transition-all duration-500">
                <DollarSign className="w-6 h-6 text-black transition-colors" />
              </div>
              <div>
                <h4 className="font-display text-xl font-bold mb-2">Checkout Veloz</h4>
                <p className="text-white/50">Menos de 2 segundos para o seu cliente finalizar e o seu celular vibrar.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 flex justify-center items-center relative min-h-[600px]">
          <div 
            ref={phoneRef}
            className="relative w-[280px] h-[580px] bg-[#0A0A0A] rounded-[3rem] border-[8px] border-[#1A1A1A] shadow-2xl overflow-hidden perspective-1000 z-10"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-black p-6 flex flex-col items-center justify-start pt-20">
              <Lock className="w-6 h-6 text-white/40 mb-4" />
              <div className="text-5xl font-display font-light text-white mb-2">{formattedTime}</div>
              <div className="text-[11px] text-white/60 uppercase tracking-widest font-medium text-center">{formattedDate}</div>
              
              <div className="mt-auto mb-8 flex flex-col items-center gap-4">
                <div className="w-10 h-1 rounded-full bg-white/20" />
                <div className="text-[10px] text-white/20 uppercase tracking-[0.2em]">Deslize para abrir</div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          </div>

          <div className="absolute left-1/2 lg:left-2/3 -translate-x-1/2 w-full max-w-[320px] space-y-4 z-20">
            {activeNotifications.map((sale) => (
              <div 
                key={sale.id}
                id={`notif-${sale.id}`}
                className="notification-card bg-black/40 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl flex items-center gap-4 group hover:border-yellow/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-yellow flex items-center justify-center shrink-0 shadow-lg shadow-yellow/20">
                  <img src="/logoquik.svg" alt="Q" className="w-5 h-auto brightness-0" onError={(e) => (e.currentTarget.src = "https://i.ibb.co/Vp8p36C/logo-quik.png")} />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-start">
                    <p className="text-[10px] text-yellow font-bold uppercase tracking-wider mb-1">Venda Realizada!</p>
                    <span className="text-[9px] text-white/30 whitespace-nowrap">agora mesmo</span>
                  </div>
                  <p className="text-white text-sm font-bold">{sale.value}</p>
                  <p className="text-white/40 text-[11px]">{sale.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute inset-0 bg-yellow/5 blur-[120px] rounded-full scale-150 -z-10" />
        </div>
      </div>
    </section>
  );
}

function LaptopDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'login' | 'loading' | 'dashboard'>('login');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isServer || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "+=100%", // Scroll distance of 100% of the viewport height
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      tl.to(lidRef.current, {
        rotateX: -110,
        ease: "none",
        onUpdate: function() {
          const p = this.progress();
          if (p > 0.8) setPhase('dashboard');
          else if (p > 0.4) setPhase('loading');
          else setPhase('login');
          setProgress(p);
        }
      });

      gsap.to(".light-bloom", {
        opacity: 0.4,
        scale: 1.5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        stagger: 0.8,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden py-32 z-[50]">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="light-bloom absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-yellow/10 rounded-full blur-[120px] opacity-0" />
      <div className="light-bloom absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-yellow/10 rounded-full blur-[120px] opacity-0" />

      <div className="relative z-10 text-center mb-20 max-w-4xl px-6">
        <span className="chip mb-6" data-reveal>Tecnologia & Dados</span>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-8" data-reveal>
          Dashboards <span className="text-yellow" data-no-typewriter>Inteligentes</span> para sua escala.
        </h2>
        <p className="text-xl text-white/60 leading-relaxed" data-reveal>
          Tome decisões baseadas em dados reais. Nossa interface foi projetada para alta performance e clareza total.
        </p>
      </div>

      <div className="perspective-2000 w-full max-w-[1000px] flex justify-center mt-20 px-10">
        <div className="relative w-full aspect-[16/10]">
          <div className="absolute bottom-0 left-0 right-0 h-[3%] bg-[#1a1a1a] rounded-b-xl border-t border-white/10 shadow-2xl z-20" />
          
          <div 
            ref={lidRef}
            className="absolute inset-0 bg-[#0a0a0a] rounded-t-xl border border-white/10 origin-bottom shadow-2xl z-10"
            style={{ transform: 'rotateX(0deg)', transformStyle: 'preserve-3d' }}
          >
            <div className="absolute inset-[2%] bg-black rounded-lg overflow-hidden border border-white/5 flex items-center justify-center">
              {phase === 'login' && (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-black/40 backdrop-blur-sm transition-opacity duration-500">
                  <div className="w-20 h-20 bg-yellow rounded-2xl flex items-center justify-center p-4 mb-6 shadow-[0_0_30px_rgba(254,255,0,0.2)]">
                    <img src="/logoquik.svg" alt="Quik" className="w-full h-auto brightness-0" onError={(e) => (e.currentTarget.src = "https://i.ibb.co/Vp8p36C/logo-quik.png")} />
                  </div>
                  <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-yellow transition-all duration-300" style={{ width: `${progress * 250}%` }} />
                  </div>
                  <p className="text-yellow font-bold text-sm uppercase tracking-widest animate-pulse">Autenticando...</p>
                </div>
              )}

              {phase === 'loading' && (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-500">
                  <div className="relative w-16 h-16 mb-6">
                    <div className="absolute inset-0 border-4 border-yellow/20 rounded-full" />
                    <div className="absolute inset-0 border-4 border-t-yellow rounded-full animate-spin" />
                  </div>
                  <p className="text-white/60 font-medium">Sincronizando seus dados...</p>
                </div>
              )}

              {phase === 'dashboard' && (
                <div className="w-full h-full bg-[#0a0a0a] p-6 animate-in fade-in zoom-in duration-700">
                  <div className="flex h-full gap-6">
                    <div className="w-16 h-full flex flex-col gap-4 border-r border-white/5 pr-4">
                      {[1,2,3,4].map(i => (
                        <div key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center ${i===1 ? 'bg-yellow text-black' : 'bg-white/5 text-white/40'}`}>
                          <div className="w-4 h-4 rounded-full border-2 border-current opacity-50" />
                        </div>
                      ))}
                    </div>
                    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
                      <header className="flex justify-between items-center">
                        <div className="h-6 w-32 bg-white/10 rounded-lg" />
                        <div className="flex gap-2">
                           <div className="h-8 w-8 rounded-full bg-white/10" />
                           <div className="h-8 w-8 rounded-full bg-yellow/20 border border-yellow/20" />
                        </div>
                      </header>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { label: 'Vendas Hoje', val: 'R$ 12.450', color: 'yellow' },
                          { label: 'Taxa Conv.', val: '4.8%', color: 'white' },
                          { label: 'Pedidos', val: '128', color: 'white' }
                        ].map((stat, i) => (
                          <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                            <p className="text-[10px] uppercase text-white/40 mb-1">{stat.label}</p>
                            <p className={`text-lg font-bold ${stat.color === 'yellow' ? 'text-yellow' : 'text-white'}`}>{stat.val}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col">
                        <div className="h-4 w-40 bg-white/10 rounded-full mb-6" />
                        <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-2">
                          {[40, 70, 45, 90, 65, 85, 55, 75, 95, 100].map((h, i) => (
                            <div 
                              key={i} 
                              className="w-full bg-gradient-to-t from-yellow/20 to-yellow/80 rounded-t-sm animate-in slide-in-from-bottom duration-1000 ease-out"
                              style={{ height: `${h}%`, transitionDelay: `${i * 100}ms` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
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
          Transparência que você <span className="text-yellow" data-no-typewriter>não encontra</span> em outro lugar.
        </h2>
        <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto" data-reveal>
          Sem mensalidade. Sem taxa de adesão. Sem surpresa no boleto. Você só paga quando vende.
          Simples assim.
        </p>

        <div data-reveal data-interactive className="mt-16 p-10 md:p-14 rounded-3xl bg-yellow text-black relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
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
            Sua operação <span className="text-yellow" data-no-typewriter>protegida</span> do início ao fim.
          </h2>
          <p className="mt-6 text-white/60 text-lg" data-reveal>
            Não é só promessa. É infraestrutura real.
          </p>
          <blockquote
            data-reveal
            className="mt-10 p-6 border-l-4 border-yellow bg-black/40 italic text-white/80"
          >
            "A Quik processa transações com o mesmo padrão de segurança dos grandes bancos digitais
            porque você merece o mesmo nível de proteção."
          </blockquote>
        </div>
        <div className="grid sm:grid-cols-2 gap-4" data-stagger>
          {items.map((i) => (
            <div 
              key={i} 
              className="group flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1 transition-all duration-500 cursor-default relative overflow-hidden"
            >
              {/* Glass Reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-8 h-8 rounded-full bg-yellow/10 flex items-center justify-center shrink-0 group-hover:bg-yellow group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-700 ease-out border border-yellow/20 group-hover:border-transparent shadow-[0_0_15px_rgba(254,255,0,0)] group-hover:shadow-[0_0_20px_rgba(254,255,0,0.4)]">
                <Check className="w-4 h-4 text-yellow group-hover:text-black transition-colors duration-500" strokeWidth={3} />
              </div>
              <span className="text-white/70 group-hover:text-white font-medium transition-colors duration-300 relative z-10">{i}</span>
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
            Respostas rápidas para quem <span className="text-yellow" data-no-typewriter>não tem tempo</span> a perder.
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
                <div className="flex items-center justify-between gap-4 group">
                  <span className="font-display text-lg font-semibold group-hover:text-yellow transition-colors">{f.q}</span>
                  <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${isOpen ? "bg-yellow text-black rotate-180" : "bg-white/5 text-white"}`}>

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
    <section id="cta" className="py-40 relative overflow-hidden bg-black">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-yellow/20 rounded-[100%] blur-[120px] opacity-30" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-yellow/10 rounded-[100%] blur-[100px] opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-yellow/10 rounded-[100%] blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <div className="bg-white/[0.03] border border-white/10 rounded-[3rem] p-12 md:p-24 backdrop-blur-xl relative overflow-hidden group">
          {/* Inner Glow and Grid */}
          <div className="absolute inset-0 grid-bg opacity-[0.05]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow/10 rounded-full blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow/10 rounded-full blur-[80px]" />

          <div className="relative max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow/10 border border-yellow/20 text-yellow text-sm font-semibold mb-8 whitespace-nowrap" data-reveal>
              <Zap className="w-4 h-4 fill-yellow shrink-0" />
              <span>Plataforma pronta em 5 minutos</span>
            </div>
            
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1]" data-reveal>
              Pronto para <span className="text-yellow" data-no-typewriter>começar?</span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 font-medium leading-relaxed" data-reveal>
              Junte-se a milhares de produtores que escalaram suas operações com a Quik. 
              Sem taxas de adesão, sem burocracia.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6" data-reveal>
              <a 
                href="#" 
                className="btn-yellow text-xl !px-12 !py-6 w-full sm:w-auto shadow-[0_0_30px_rgba(254,255,0,0.3)] hover:shadow-[0_0_50px_rgba(254,255,0,0.5)] transition-all duration-500"
                data-interactive
              >
                <span className="btn-flip-content">Criar conta agora <ArrowRight className="ml-2 w-6 h-6" /></span>
                <span className="btn-flip-hidden">Criar conta agora <ArrowRight className="ml-2 w-6 h-6" /></span>
              </a>
              <a 
                href="#" 
                className="text-white/60 hover:text-white transition-all duration-300 font-semibold text-lg flex items-center gap-2 group/link"
                data-interactive
              >
                Falar com um especialista
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
            </div>

            <div className="mt-16 pt-12 border-t border-white/5 flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-40" data-reveal>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-yellow" />
                <span className="text-sm font-medium">Sem mensalidade</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-yellow" />
                <span className="text-sm font-medium">Aprovação imediata</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-yellow" />
                <span className="text-sm font-medium">Pix na hora</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const links = [
    { label: "Início", href: "#" },
    { label: "Por que a Quik", href: "#por-que" },
    { label: "Prêmios", href: "#premios" },
    { label: "Como funciona", href: "#como" },
    { label: "Preços", href: "#precos" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <footer className="border-t border-white/10 bg-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="inline-block mb-6 hover:scale-105 transition-transform duration-300">
              <img src="/logoquik.svg" alt="Quik Logo" className="h-8 w-auto" />
            </a>
            <p className="text-white/40 max-w-sm text-sm leading-relaxed">
              A Quik é a plataforma de pagamentos feita para quem leva o digital a sério. 
              Simples, rápida e segura do primeiro produto ao primeiro milhão.
            </p>
          </div>
          
          <div className="lg:col-start-4">
            <h4 className="font-display text-white font-bold mb-6 text-sm uppercase tracking-wider">Links Úteis</h4>
            <div className="grid grid-cols-2 gap-y-3 gap-x-8">
              {links.map((link) => (
                <a 
                  key={link.label}
                  href={link.href} 
                  className="text-white/50 hover:text-yellow text-sm transition-all duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-yellow mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-white/20 flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <span>© 2026 Quik. Todos os direitos reservados.</span>
            <span className="hidden md:inline text-white/20">•</span>
            <a 
              href="https://www.instagram.com/brabodosites" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-yellow transition-colors"
            >
              Site desenvolvido por: <span className="font-bold">Brabo dos sites</span>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-white/40 font-medium uppercase tracking-widest">Sistemas operantes</span>
            </div>
          </div>
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
        <NextSteps />
        <HowItWorks />
        <GatewayAwards />
        <LaptopDashboard />
        <RealTimeNotifications />
        <Pricing />
        <Security />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
