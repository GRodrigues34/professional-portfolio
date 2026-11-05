import React, { useEffect, useRef, useState } from 'react';

interface ServiceItem {
  num: string;
  title: string;
  stack: string;
  description: string;
  deliverables: string[];
  priceLabel: string;
  priceMain: string;
  priceSub: string;
  ctaLabel: string;
  whatsappText: string;
}

const SERVICES: ServiceItem[] = [
  {
    num: '01',
    title: 'Landing Pages & Catálogos',
    stack: 'Astro · Tailwind CSS · SEO Local',
    description:
      'Páginas de página única, vitrines de produtos e páginas de campanha estruturadas para velocidade máxima e conversão direta no WhatsApp.',
    deliverables: [
      'Entrega ágil e código 100% autoral',
      'Nota máxima no Google Core Web Vitals',
      'SEO local estruturado para Google Maps e Busca',
      'Hospedagem global e SSL inclusos na manutenção',
    ],
    priceLabel: 'Investimento inicial',
    priceMain: 'R$ 390',
    priceSub: '+ R$ 39 / mês (hospedagem e manutenção)',
    ctaLabel: 'Solicitar Landing Page',
    whatsappText:
      'Olá Gustavo! Quero iniciar uma Landing Page (R$ 390 + R$ 39/mês).',
  },
  {
    num: '02',
    title: 'Sites Institucionais',
    stack: 'Astro Shell · TypeScript · React Islands',
    description:
      'Presença digital completa para empresas, clínicas e escritórios que precisam apresentar estrutura, múltiplas áreas de atuação e credibilidade sólida.',
    deliverables: [
      'Arquitetura multi-seções ou múltiplas páginas',
      'Componentes interativos sob medida em React',
      'HTML 100% pré-renderizado para indexação no Google',
      'Suporte técnico, segurança e evolução mensal',
    ],
    priceLabel: 'Investimento inicial',
    priceMain: 'R$ 990',
    priceSub: '+ R$ 89 / mês (hospedagem e manutenção)',
    ctaLabel: 'Solicitar Site Institucional',
    whatsappText:
      'Olá Gustavo! Quero solicitar um Site Institucional completo (R$ 990 + R$ 89/mês).',
  },
  {
    num: '03',
    title: 'Automações de Processos',
    stack: 'n8n Workflows · Webhooks · CRM & WhatsApp',
    description:
      'Fluxos automatizados operando 24h por dia para conectar captação de leads, WhatsApp, planilhas, notificações e sistemas internos sem trabalho manual.',
    deliverables: [
      'Disparo e triagem imediata de leads no WhatsApp',
      'Sincronização automática entre formulários, CRM e planilhas',
      'Relatórios operacionais e alertas em tempo real',
      'Monitoramento contínuo e manutenção do fluxo',
    ],
    priceLabel: 'Assinatura por fluxo',
    priceMain: 'R$ 190/mês',
    priceSub: 'A partir de R$ 190/mês · Setup sob medida',
    ctaLabel: 'Automatizar processos',
    whatsappText:
      'Olá Gustavo! Quero saber mais sobre Automações de Processos com n8n (a partir de R$ 190/mês).',
  },
  {
    num: '04',
    title: 'Produtos Digitais & Sistemas Especiais',
    stack: 'TypeScript · React · Java / Spring · MySQL',
    description:
      'Aplicações web operacionais, painéis administrativos, controle financeiro e plataformas internas desenhadas para regras exclusivas do seu negócio.',
    deliverables: [
      'Painéis administrativos, dashboards e gestão de pedidos',
      'Autenticação segura e controle de permissões',
      'Modelagem de banco de dados relacional e APIs REST',
      'Escopo fechado e arquitetura escalável',
    ],
    priceLabel: 'Escopo dedicado',
    priceMain: 'Sob análise',
    priceSub: 'Orçamento estruturado conforme requisitos',
    ctaLabel: 'Avaliar sistema sob medida',
    whatsappText:
      'Olá Gustavo! Tenho um Produto Digital / Sistema Especial em mente e gostaria de avaliar o escopo.',
  },
  {
    num: '05',
    title: 'Automações com Agentes de IA',
    stack: 'Claude & OpenAI APIs · Fluxos Inteligentes',
    description:
      'Agentes inteligentes e pipelines contextuais para atendimento 24h, qualificação automática de clientes e leitura ou processamento de documentos.',
    deliverables: [
      'Assistentes de atendimento e triagem calibrados ao seu negócio',
      'Extração de dados de documentos, PDFs e mensagens',
      'Integração direta com WhatsApp e sistemas internos',
      'Arquitetura auditável sem respostas genéricas',
    ],
    priceLabel: 'Escopo dedicado',
    priceMain: 'Sob análise',
    priceSub: 'Projeto e recorrência sob avaliação técnica',
    ctaLabel: 'Consultar Agentes de IA',
    whatsappText:
      'Olá Gustavo! Quero avaliar uma Automação com IA para a operação da minha empresa.',
  },
];

export const ServicesTimeline: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  const [lineScale, setLineScale] = useState(0.08);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updateOnScroll = () => {
      const container = trackRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const triggerY = window.innerHeight * 0.52;

      // Calculate continuous progress of the scroll line (0 to 1)
      const rawProgress = (triggerY - rect.top) / Math.max(rect.height, 1);
      const clamped = Math.max(0.04, Math.min(1, rawProgress));
      setLineScale(clamped);

      // Determine which service node is currently illuminated
      let currentIdx = 0;
      rowRefs.current.forEach((row, idx) => {
        if (!row) return;
        const r = row.getBoundingClientRect();
        if (r.top <= triggerY) {
          currentIdx = idx;
        }
      });
      setActiveIndex(currentIdx);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateOnScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateOnScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="grid-12 items-start">
      {/* Left Sticky Editorial Column (Col 1-4) */}
      <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-[16vh] space-y-6 mb-12 lg:mb-0">
        <p className="p-ed text-[#ff5500]">03 / Serviços e Investimento</p>
        <h2 className="h2-ed">
          Do primeiro pixel ao sistema <span className="serif-italic font-normal text-[var(--grey)]">no ar.</span>
        </h2>
        <p className="p-ed max-w-[340px]">
          Você me explica o seu objetivo comercial. Eu indico o formato exato, organizo a arquitetura e cuido de toda a execução técnica.
        </p>

        {/* Active Scroll Counter Pill */}
        <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between max-w-[260px] text-[13px]">
          <span className="text-[var(--dim)]">Escopo em foco</span>
          <span className="font-medium text-[#faf8f5] tabular-nums">
            <span className="text-[#ff5500]">0{activeIndex + 1}</span> / 0{SERVICES.length}
          </span>
        </div>
      </div>

      {/* Right Scroll-Tracked Timeline Ledger (Col 5-13) */}
      <div ref={trackRef} className="col-span-12 lg:col-span-8 lg:col-start-5 relative pl-9 sm:pl-14">
        {/* Base Hairline Rail */}
        <div
          className="absolute left-3.5 sm:left-5 top-2 bottom-2 w-px bg-[var(--line)]"
          aria-hidden="true"
        />

        {/* Continuous Scroll-Tracked Orange Line (Lucas Portfolio mechanic) */}
        <div
          className="pointer-events-none absolute left-3.5 sm:left-5 top-2 bottom-2 w-[2px] -ml-[0.5px] origin-top bg-[#ff5500] transition-transform duration-150 ease-out"
          style={{
            transform: `scaleY(${lineScale})`,
            boxShadow: '0 0 18px rgba(255, 85, 0, 0.55)',
          }}
          aria-hidden="true"
        />

        <div>
          {SERVICES.map((item, idx) => {
            const isReached = idx <= activeIndex;
            const isCurrent = idx === activeIndex;

            return (
              <article
                key={item.num}
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
                className={`relative py-10 sm:py-12 border-t border-[var(--line)] transition-opacity duration-500 ${
                  isCurrent ? 'opacity-100' : isReached ? 'opacity-80' : 'opacity-45'
                }`}
              >
                {/* Top animated orange rule when active */}
                <div
                  className="absolute left-0 right-0 top-0 h-[1px] bg-[#ff5500] origin-left transition-transform duration-700"
                  style={{ transform: isCurrent ? 'scaleX(1)' : 'scaleX(0)' }}
                  aria-hidden="true"
                />

                {/* Circular Node on the Scroll Line */}
                <div
                  className={`absolute -left-9 sm:-left-14 top-10 sm:top-12 w-7 h-7 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center text-[11px] sm:text-xs font-medium tabular-nums transition-all duration-300 z-10 ${
                    isCurrent
                      ? 'bg-[#ff5500] border-[#ff5500] text-[#0a0a0a] scale-110 shadow-[0_0_20px_rgba(255,85,0,0.45)]'
                      : isReached
                      ? 'bg-[#141312] border-[#ff5500] text-[#ff5500]'
                      : 'bg-[#0a0a0a] border-[var(--line)] text-[var(--dim)]'
                  }`}
                >
                  {item.num}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Service Details (8 cols) */}
                  <div className="md:col-span-7 space-y-4">
                    <div>
                      <span className="text-[12px] font-medium text-[#ff5500] tracking-[-0.01em]">
                        {item.stack}
                      </span>
                      <h3 className="text-[clamp(22px,2.2vw,34px)] font-medium tracking-[-0.03em] text-[#faf8f5] leading-[1.06] mt-1">
                        {item.title}
                      </h3>
                    </div>

                    <p className="p-ed">{item.description}</p>

                    <ul className="space-y-1.5 pt-2">
                      {item.deliverables.map((del, dIdx) => (
                        <li
                          key={dIdx}
                          className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-[var(--grey)]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] mt-2 shrink-0" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Highlighted Pricing Block (5 cols) */}
                  <div
                    className={`md:col-span-5 md:text-right flex flex-col md:items-end justify-between gap-6 p-5 border transition-colors duration-500 ${
                      isCurrent
                        ? 'border-[#ff5500]/60 bg-[#141210]'
                        : 'border-[var(--line)] bg-[#0e0e0f]'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--dim)] block">
                        {item.priceLabel}
                      </span>
                      <div
                        className={`text-[clamp(28px,3vw,44px)] font-medium leading-none tracking-[-0.04em] tabular-nums transition-colors duration-300 ${
                          isCurrent ? 'text-[#ff5500]' : 'text-[#faf8f5]'
                        }`}
                      >
                        {item.priceMain}
                      </div>
                      <span className="text-[12px] text-[var(--grey)] block pt-1">
                        {item.priceSub}
                      </span>
                    </div>

                    <a
                      href={`https://wa.me/5535984788359?text=${encodeURIComponent(
                        item.whatsappText
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="line-link md:max-w-[220px]"
                    >
                      <span className="roll">
                        <span className="roll-a">{item.ctaLabel}</span>
                        <span className="roll-b" aria-hidden="true">
                          {item.ctaLabel}
                        </span>
                      </span>
                      <span className="text-[#ff5500]">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
