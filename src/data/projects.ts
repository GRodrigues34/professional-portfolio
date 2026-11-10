export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href?: string;
}

/**
 * Reusable project catalog.
 * To add a new project, append an entry with `image`, `title`, and `description`.
 */
export const PROJECTS: ProjectItem[] = [
  {
    id: 'projeto-01',
    title: 'CSF Steel Frame & Chalés',
    description:
      'Catálogo estrutural e vitrine comercial de chalés modulares com carregamento instantâneo e captação direta via WhatsApp.',
    image: '/images/project-placeholder.svg',
    href: '#contato',
  },
  {
    id: 'projeto-02',
    title: 'Aurora Bookstore',
    description:
      'Plataforma de e-commerce editorial com busca instantânea, autenticação de clientes e gestão de pedidos em tempo real.',
    image: '/images/project-placeholder.svg',
    href: '#contato',
  },
  {
    id: 'projeto-03',
    title: 'SisAPEC Healthcare',
    description:
      'Módulos clínicos de prontuário eletrônico e telemetria de sinais vitais em ambiente de alta disponibilidade.',
    image: '/images/project-placeholder.svg',
    href: '#contato',
  },
  {
    id: 'projeto-04',
    title: 'Automação Comercial & Triagem',
    description:
      'Fluxo inteligente integrando captação de leads, qualificação imediata no WhatsApp e sincronização com painel de vendas.',
    image: '/images/project-placeholder.svg',
    href: '#contato',
  },
];
