import React, { useState, useEffect } from 'react';
import './App.css';
import partnerGabriel from './assets/partner_gabriel.jpg';
import partnerHelena from './assets/partner_helena.jpg';
import Hero3DCanvas from './components/Hero3DCanvas';
import TiltCard from './components/TiltCard';

function App() {
  // ==========================================================================
  // ESTADOS DO APP (INTERATIVIDADE E EVENTOS)
  // ==========================================================================
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [activeFaq, setActiveFaq] = useState(null);
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacy: false
  });

  // ==========================================================================
  // EFFECT HOOKS
  // ==========================================================================
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsScrollTopVisible(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section highlight on scroll
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -55% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.getAttribute('id'));
        }
      });
    }, observerOptions);

    sections.forEach(s => observer.observe(s));
    return () => sections.forEach(s => observer.unobserve(s));
  }, []);

  // Scroll Reveal Animations
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.reveal-element');
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.08
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
    return () => animatedElements.forEach(el => observer.unobserve(el));
  }, []);

  // Modal ESC key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // ==========================================================================
  // HANDLERS
  // ==========================================================================
  const toggleMenu = () => {
    setIsMenuOpen(prev => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const toggleFaq = (index) => {
    setActiveFaq(prev => (prev === index ? null : index));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden';
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        privacy: false
      });
    }, 1600);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      {/* Top Accent Line */}
      <div className="top-accent-bar"></div>

      {/* Header / Navbar */}
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="container navbar-container">
          <a href="#inicio" className="logo" onClick={closeMenu}>
            <div className="logo-icon-emblem">
              <i className="fa-solid fa-scale-balanced"></i>
            </div>
            <div className="logo-text">
              <span className="brand-name">AURORA</span>
              <span className="brand-sub">ASSOCIADOS</span>
            </div>
          </a>

          <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu">
            <ul className="nav-list">
              <li>
                <a
                  href="#inicio"
                  className={`nav-link ${activeSection === 'inicio' ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#sobre"
                  className={`nav-link ${activeSection === 'sobre' ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Institucional
                </a>
              </li>
              <li>
                <a
                  href="#atuacao"
                  className={`nav-link ${activeSection === 'atuacao' ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Especialidades
                </a>
              </li>
              <li>
                <a
                  href="#equipe"
                  className={`nav-link ${activeSection === 'equipe' ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Corpo Jurídico
                </a>
              </li>
              <li>
                <a
                  href="#depoimentos"
                  className={`nav-link ${activeSection === 'depoimentos' ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Reconhecimento
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className={`nav-link ${activeSection === 'faq' ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  className={`nav-link ${activeSection === 'contato' ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Contato
                </a>
              </li>
            </ul>
          </nav>

          <div className="nav-actions">
            <a href="#contato" className="btn btn-outline btn-nav" onClick={closeMenu}>
              Agendar Consulta
            </a>
            <button
              className={`mobile-toggle ${isMenuOpen ? 'active' : ''}`}
              id="mobile-toggle"
              onClick={toggleMenu}
              aria-label="Abrir menu institucional"
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - Asymmetric Editorial & 3D WebGL Canvas */}
      <section className="hero-section" id="inicio">
        <div className="hero-bg-grid"></div>
        <div className="hero-bg-gradient"></div>
        <div className="container">
          <div className="hero-grid">
            {/* Lado Esquerdo - Tipografia & Posicionamento */}
            <div className="hero-content">
              <div className="hero-badge-pill">
                <i className="fa-solid fa-gem"></i> Advocacia de Alta Complexidade
              </div>

              <h1 className="hero-title">
                Defesa Estratégica & <span>Rigor Jurídico</span> sem Concessões.
              </h1>

              <p className="hero-subtitle">
                Atuação focada na preservação patrimonial, reestruturação corporativa e litígios civis de grande porte. Atendimento artesanal conduzir por sócios sêniores.
              </p>

              <div className="hero-actions">
                <a href="#contato" className="btn btn-gold btn-large">
                  Agendar Reunião Sigilosa
                </a>
                <a href="#atuacao" className="btn btn-outline btn-large">
                  Conhecer Especialidades
                </a>
              </div>

              <div className="hero-location-strip">
                <i className="fa-solid fa-location-dot"></i>
                <span>Sede Física em Guarapuava / PR &bull; Atuação Integrada nos Tribunais Superiores</span>
              </div>
            </div>

            {/* Lado Direito - Monumento 3D Interativo WebGL */}
            <div className="hero-3d-wrapper">
              <div className="hero-3d-frame">
                <Hero3DCanvas />
                <div className="hero-3d-caption">
                  <span>Equilíbrio &amp; Excelência</span>
                  <span>Interativo 3D WebGL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nós / Manifesto Institucional */}
      <section className="about-section section-padding" id="sobre">
        <div className="container">
          <div className="grid grid-2">
            <div className="about-info reveal-element">
              <div className="section-header">
                <span className="section-subtitle-tag">Posicionamento Institucional</span>
                <h2 className="section-title">A Advocacia como Instrumento de Proteção e Crescimento</h2>
              </div>

              <div className="editorial-quote-box">
                <p className="editorial-quote-text">
                  "Não tratamos causas jurídicas como números. Cada caso exige arquitetura técnica própria, sigilo inflexível e fundamentação doutrinária profunda."
                </p>
              </div>

              <p className="about-body-text">
                Fundado com o compromisso de entregar advocacia preventiva e litigiosa do mais elevado padrão, o escritório <strong>Aurora & Associados</strong> consolidou sua reputação na condução de operações corporativas delicadas, governança familiar e contencioso cível.
              </p>
              <p className="about-body-text">
                Sem modelos padronizados, nossos clientes dispõem de acompanhamento direto e contínuo dos sócios fundadores, garantindo agilidade técnica nas decisões decisivas de seus negócios.
              </p>

              <div className="signature-block">
                <div className="signature-divider"></div>
                <div>
                  <span className="signature-name">Dr. Gabriel Aurora</span>
                  <span className="signature-title">Sócio-Fundador &bull; OAB/PR 14.892</span>
                </div>
              </div>
            </div>

            {/* Pilares Institucionais em Fine Hairline Cards */}
            <div className="pillars-list">
              <TiltCard className="pillar-item reveal-element">
                <div className="pillar-number">01</div>
                <h3 className="pillar-heading">Rigor Doutrinário &amp; Técnico</h3>
                <p className="pillar-text">
                  Investigação minuciosa do ordenamento e da jurisprudência mais recente para contrução de teses customizadas com elevado índice de êxito.
                </p>
              </TiltCard>

              <TiltCard className="pillar-item reveal-element">
                <div className="pillar-number">02</div>
                <h3 className="pillar-heading">Confidencialidade Estatutária</h3>
                <p className="pillar-text">
                  Protocolos rigorosos de segurança de dados e sigilo absoluto, protegendo ativos tangíveis e intangíveis de nossos representados.
                </p>
              </TiltCard>

              <TiltCard className="pillar-item reveal-element">
                <div className="pillar-number">03</div>
                <h3 className="pillar-heading">Atendimento Conduzido pelos Sócios</h3>
                <p className="pillar-text">
                  Comunicação direta sem intermediários. Os sócios titulares gerenciam ativamente todas as reuniões e petições vitais do processo.
                </p>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section className="services-section section-padding" id="atuacao">
        <div className="container">
          <div className="section-header text-center max-w-750 reveal-element">
            <span className="section-subtitle-tag">Domínio Técnico</span>
            <h2 className="section-title">Especialidades Jurídicas Estruturadas</h2>
            <p className="section-desc">
              Soluções integradas para demandas corporativas, contratuais, governança familiar e direito digital.
            </p>
          </div>

          <div className="grid grid-3 services-grid">
            <TiltCard className="reveal-element">
              <div className="service-card-editorial">
                <div className="service-header">
                  <span className="service-num">01</span>
                  <i className="fa-solid fa-building-columns service-icon-minimal"></i>
                </div>
                <h3 className="service-title-editorial">Direito Corporativo &amp; M&amp;A</h3>
                <p className="service-desc-editorial">
                  Assessoria estratégica para aquisições, reorganizações societárias, acordos de acionistas e auditorias preventivas (due diligence).
                </p>
                <a href="#contato" className="service-link-minimal">
                  Agendar Triagem <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </TiltCard>

            <TiltCard className="reveal-element">
              <div className="service-card-editorial">
                <div className="service-header">
                  <span className="service-num">02</span>
                  <i className="fa-solid fa-file-signature service-icon-minimal"></i>
                </div>
                <h3 className="service-title-editorial">Direito Civil &amp; Contratos</h3>
                <p className="service-desc-editorial">
                  Redação de instrumentos contratuais complexos, contencioso cível estratégico e arbitragem em disputas patrimoniais.
                </p>
                <a href="#contato" className="service-link-minimal">
                  Agendar Triagem <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </TiltCard>

            <TiltCard className="reveal-element">
              <div className="service-card-editorial">
                <div className="service-header">
                  <span className="service-num">03</span>
                  <i className="fa-solid fa-vault service-icon-minimal"></i>
                </div>
                <h3 className="service-title-editorial">Planejamento Patrimonial</h3>
                <p className="service-desc-editorial">
                  Estruturação de Holdings familiares, governança sucessória e proteção jurídica legal do patrimônio empresarial e pessoal.
                </p>
                <a href="#contato" className="service-link-minimal">
                  Agendar Triagem <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </TiltCard>

            <TiltCard className="reveal-element">
              <div className="service-card-editorial">
                <div className="service-header">
                  <span className="service-num">04</span>
                  <i className="fa-solid fa-shield-halved service-icon-minimal"></i>
                </div>
                <h3 className="service-title-editorial">Direito Digital &amp; LGPD</h3>
                <p className="service-desc-editorial">
                  Adequação regulatória de dados, proteção de ativos intangíveis, governança cibernética e defesa em litígios de tecnologia.
                </p>
                <a href="#contato" className="service-link-minimal">
                  Agendar Triagem <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </TiltCard>

            <TiltCard className="reveal-element">
              <div className="service-card-editorial">
                <div className="service-header">
                  <span className="service-num">05</span>
                  <i className="fa-solid fa-city service-icon-minimal"></i>
                </div>
                <h3 className="service-title-editorial">Mercado Imobiliário de Luxo</h3>
                <p className="service-desc-editorial">
                  Estruturação jurídica de incorporações, transações imobiliárias corporativas de grande porte e regularização de ativos.
                </p>
                <a href="#contato" className="service-link-minimal">
                  Agendar Triagem <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </TiltCard>

            <TiltCard className="reveal-element">
              <div className="service-card-editorial">
                <div className="service-header">
                  <span className="service-num">06</span>
                  <i className="fa-solid fa-coins service-icon-minimal"></i>
                </div>
                <h3 className="service-title-editorial">Direito Tributário Estratégico</h3>
                <p className="service-desc-editorial">
                  Planejamento fiscal preventivo, defesa em autuações administrativas/judiciais e recuperação de tributos pagos indevidamente.
                </p>
                <a href="#contato" className="service-link-minimal">
                  Agendar Triagem <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Corpo Jurídico / Sócios */}
      <section className="team-section section-padding" id="equipe">
        <div className="container">
          <div className="section-header text-center max-w-750 reveal-element">
            <span className="section-subtitle-tag">Liderança Acadêmica &amp; Prática</span>
            <h2 className="section-title">Sócios Titulares</h2>
            <p className="section-desc">
              Advogados sêniores com sólida produção intelectual e vasto histórico nos tribunais de todo o Brasil.
            </p>
          </div>

          <div className="grid grid-2 team-grid">
            <TiltCard className="reveal-element">
              <div className="team-card-editorial">
                <div className="team-img-box">
                  <img src={partnerGabriel} alt="Dr. Gabriel Aurora" className="team-img-content" />
                </div>
                <div className="team-info-box">
                  <span className="partner-role-tag">Sócio-Fundador</span>
                  <h3 className="partner-name-editorial">Dr. Gabriel Aurora</h3>
                  <p className="partner-spec">Direito Corporativo &amp; Tributário</p>
                  <p className="partner-bio-editorial">
                    Mestre em Direito Comercial pela Universidade de São Paulo (USP). Mais de 18 anos de experiência na assessoria jurídica de grandes grupos empresariais e reestruturações societárias de alta relevância.
                  </p>
                  <div className="partner-oab-badge">Inscrição Ordem: OAB/PR 14.892</div>
                </div>
              </div>
            </TiltCard>

            <TiltCard className="reveal-element">
              <div className="team-card-editorial">
                <div className="team-img-box">
                  <img src={partnerHelena} alt="Dra. Helena Santos" className="team-img-content" />
                </div>
                <div className="team-info-box">
                  <span className="partner-role-tag">Sócia Principal</span>
                  <h3 className="partner-name-editorial">Dra. Helena Santos</h3>
                  <p className="partner-spec">Direito Civil &amp; Cibersegurança</p>
                  <p className="partner-bio-editorial">
                    Mestre pela Fundação Getulio Vargas (FGV). Especialista na coordenação de litígios civis de alta complexidade e projetos avançados de conformidade regulatória para o setor de tecnologia.
                  </p>
                  <div className="partner-oab-badge">Inscrição Ordem: OAB/PR 23.140</div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Reconhecimento & Depoimentos */}
      <section className="testimonials-section section-padding" id="depoimentos">
        <div className="container">
          <div className="section-header text-center max-w-600 reveal-element">
            <span className="section-subtitle-tag">Credibilidade Comprovada</span>
            <h2 className="section-title">Citações de Clientes</h2>
            <p className="section-desc">
              Depoimentos de executivos e famílias representadas pelo escritório com sigilo assegurado.
            </p>
          </div>

          <div className="grid grid-3">
            <TiltCard className="reveal-element">
              <div className="testimonial-card-editorial">
                <div className="quote-mark">&ldquo;</div>
                <p className="testimonial-quote-editorial">
                  A condução da Aurora &amp; Associados no processo de reorganização societária do nosso grupo foi cirúrgica. Demonstraram absoluto rigor técnico e prontidão nos momentos decisivos.
                </p>
                <div className="client-info-editorial">
                  <span className="client-name-editorial">D. R. V.</span>
                  <span className="client-desc-editorial">CEO de Holding de Infraestrutura</span>
                </div>
              </div>
            </TiltCard>

            <TiltCard className="reveal-element">
              <div className="testimonial-card-editorial">
                <div className="quote-mark">&ldquo;</div>
                <p className="testimonial-quote-editorial">
                  A estruturação da nossa holding patrimonial foi realizada com extrema discrição e clareza. Tivemos a tranquilidade de contar com o envolvimento direto dos sócios do início ao fim.
                </p>
                <div className="client-info-editorial">
                  <span className="client-name-editorial">Família Albuquerque</span>
                  <span className="client-desc-editorial">Planejamento Familiar &amp; Sucessório</span>
                </div>
              </div>
            </TiltCard>

            <TiltCard className="reveal-element">
              <div className="testimonial-card-editorial">
                <div className="quote-mark">&ldquo;</div>
                <p className="testimonial-quote-editorial">
                  A equipe da Dra. Helena conduziu a adequação regulatória da nossa plataforma com maestria. Evitamos riscos regulatórios pesados graças ao trabalho técnico preventivo.
                </p>
                <div className="client-info-editorial">
                  <span className="client-name-editorial">M. S. G.</span>
                  <span className="client-desc-editorial">Diretor de Tecnologia de Fintech</span>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* FAQ Acordeão */}
      <section className="faq-section section-padding" id="faq">
        <div className="container max-w-900">
          <div className="section-header text-center reveal-element">
            <span className="section-subtitle-tag">Esclarecimentos Institucionais</span>
            <h2 className="section-title">Perguntas Frequentes</h2>
            <p className="section-desc">Informações essenciais sobre o atendimento e a contratação do escritório.</p>
          </div>

          <div className="faq-accordion-editorial">
            <div className={`faq-item-editorial ${activeFaq === 0 ? 'active' : ''}`}>
              <button className="faq-question-btn" onClick={() => toggleFaq(0)}>
                <span>Como funciona o primeiro atendimento de triagem?</span>
                <i className="fa-solid fa-chevron-down faq-chevron"></i>
              </button>
              <div className="faq-answer-box" style={{ maxHeight: activeFaq === 0 ? '300px' : '0px' }}>
                <div className="faq-answer-content-inner">
                  <p>
                    Após o envio de suas informações no formulário abaixo, nossa equipe de triagem entrará em contato em até 4 horas úteis para formalizar uma reunião presencial em nossa sede em Guarapuava / PR ou por conferência criptografada.
                  </p>
                </div>
              </div>
            </div>

            <div className={`faq-item-editorial ${activeFaq === 1 ? 'active' : ''}`}>
              <button className="faq-question-btn" onClick={() => toggleFaq(1)}>
                <span>Qual a política do escritório referente a honorários advocatícios?</span>
                <i className="fa-solid fa-chevron-down faq-chevron"></i>
              </button>
              <div className="faq-answer-box" style={{ maxHeight: activeFaq === 1 ? '300px' : '0px' }}>
                <div className="faq-answer-content-inner">
                  <p>
                    Nossos honorários são formalizados em contrato de prestação de serviços detalhado, alinhado com a tabela de honorários recomendada pela Ordem dos Advogados do Brasil (OAB/PR) e proporcional à complexidade e valor econômico da causa.
                  </p>
                </div>
              </div>
            </div>

            <div className={`faq-item-editorial ${activeFaq === 2 ? 'active' : ''}`}>
              <button className="faq-question-btn" onClick={() => toggleFaq(2)}>
                <span>O escritório atende demandas fora do Estado do Paraná?</span>
                <i className="fa-solid fa-chevron-down faq-chevron"></i>
              </button>
              <div className="faq-answer-box" style={{ maxHeight: activeFaq === 2 ? '300px' : '0px' }}>
                <div className="faq-answer-content-inner">
                  <p>
                    Sim. Com a atuação por meio de peticionamento 100% eletrônico e sustentação oral por videoconferência, representamos clientes em Tribunais de Justiça estaduais, Tribunais Regionais Federais (TRFs) e nas Cortes Superiores (STJ e STF) em Brasília.
                  </p>
                </div>
              </div>
            </div>

            <div className={`faq-item-editorial ${activeFaq === 3 ? 'active' : ''}`}>
              <button className="faq-question-btn" onClick={() => toggleFaq(3)}>
                <span>Quais os protocolos de segurança para proteção de documentos?</span>
                <i className="fa-solid fa-chevron-down faq-chevron"></i>
              </button>
              <div className="faq-answer-box" style={{ maxHeight: activeFaq === 3 ? '300px' : '0px' }}>
                <div className="faq-answer-content-inner">
                  <p>
                    Utilizamos infraestrutura de nuvem corporativa com encriptação AES-256 e controle de acesso estrito por múltiplo fator de autenticação, em plena observância ao Estatuto da Advocacia e à LGPD.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato & Localização (Guarapuava / PR) */}
      <section className="contact-section section-padding" id="contato">
        <div className="container">
          <div className="grid grid-2">
            <div className="contact-info reveal-element">
              <div className="section-header">
                <span className="section-subtitle-tag">Atendimento Direto</span>
                <h2 className="section-title">Inicie sua Defesa Jurídica Estratégica</h2>
                <p className="section-desc">
                  Agende uma reunião inicial privada para avaliação circunstanciada de sua demanda.
                </p>
              </div>

              <div className="contact-details-editorial">
                <div className="contact-row">
                  <div className="contact-icon-frame">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div className="contact-text-meta">
                    <span className="contact-lbl">Central de Atendimento</span>
                    <a href="tel:+554230004000" className="contact-val">+55 (42) 3000-4000</a>
                  </div>
                </div>

                <div className="contact-row">
                  <div className="contact-icon-frame">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div className="contact-text-meta">
                    <span className="contact-lbl">E-mail Institucional</span>
                    <a href="mailto:contato@auroraadvocacia.com.br" className="contact-val">contato@auroraadvocacia.com.br</a>
                  </div>
                </div>

                <div className="contact-row">
                  <div className="contact-icon-frame">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="contact-text-meta">
                    <span className="contact-lbl">Sede Principal</span>
                    <span className="contact-val">
                      Rua Senador Pinheiro Machado, 1800 - 2º Andar<br />
                      Centro - Guarapuava / PR - CEP 85010-100
                    </span>
                  </div>
                </div>
              </div>

              <div className="oab-institutional-box">
                <i className="fa-solid fa-scale-unbalanced-flip oab-icon"></i>
                <p>
                  Aurora &amp; Associados Sociedade de Advogados devidamente inscrita na Seccional da Ordem dos Advogados do Brasil sob o nº 12.345/PR.
                </p>
              </div>
            </div>

            {/* Formulário de Contato */}
            <div className="contact-form-card reveal-element">
              <h3 className="form-title-editorial">Solicitar Agendamento</h3>
              <p className="form-sub-editorial">Preencha os dados primários para início do processo de triagem.</p>

              <form className="contact-form-layout" onSubmit={handleSubmit}>
                <div className="field-group">
                  <label htmlFor="name">Nome Completo</label>
                  <div className="field-input-box">
                    <i className="fa-regular fa-user field-icon"></i>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ex: João da Silva"
                      required
                    />
                  </div>
                </div>

                <div className="form-grid grid-2">
                  <div className="field-group">
                    <label htmlFor="email">E-mail Corporativo</label>
                    <div className="field-input-box">
                      <i className="fa-regular fa-envelope field-icon"></i>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="joao@empresa.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="field-group">
                    <label htmlFor="phone">Telefone / WhatsApp</label>
                    <div className="field-input-box">
                      <i className="fa-solid fa-phone-flip field-icon"></i>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(42) 99999-9999"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="field-group">
                  <label htmlFor="subject">Especialidade Requerida</label>
                  <div className="field-input-box">
                    <i className="fa-solid fa-list-check field-icon"></i>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Selecione a área jurídica...</option>
                      <option value="corporativo">Direito Corporativo &amp; M&amp;A</option>
                      <option value="civil">Direito Civil &amp; Contratos</option>
                      <option value="patrimonial">Planejamento Patrimonial</option>
                      <option value="digital">Direito Digital &amp; LGPD</option>
                      <option value="imobiliario">Mercado Imobiliário de Luxo</option>
                      <option value="tributario">Direito Tributário Estratégico</option>
                      <option value="outros">Outros Litígios Complexos</option>
                    </select>
                  </div>
                </div>

                <div className="field-group">
                  <label htmlFor="message">Resumo da Demanda (Opcional)</label>
                  <div className="field-input-box">
                    <i className="fa-regular fa-message field-icon textarea-icon-pos"></i>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Descreva suscintamente o escopo de sua consulta."
                    ></textarea>
                  </div>
                </div>

                <div className="form-checkbox-row">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    checked={formData.privacy}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="privacy">
                    Declaro estar ciente de que as informações prestadas são protegidas pelo sigilo profissional (OAB) e pela LGPD.
                  </label>
                </div>

                <button type="submit" className="btn btn-gold btn-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span>Transmitindo Dados Criptografados...</span>
                      <i className="fa-solid fa-spinner fa-spin style-icon-margin"></i>
                    </>
                  ) : (
                    <>
                      <span>Enviar Solicitação de Consulta</span>
                      <i className="fa-solid fa-paper-plane style-icon-margin"></i>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-top-grid">
          <div>
            <a href="#inicio" className="logo">
              <div className="logo-icon-emblem">
                <i className="fa-solid fa-scale-balanced"></i>
              </div>
              <div className="logo-text">
                <span className="brand-name">AURORA</span>
                <span className="brand-sub">ASSOCIADOS</span>
              </div>
            </a>
            <p className="footer-brand-desc">
              Compromisso inabalável com a ética, o rigor acadêmico e a defesa intransigente dos direitos de nossos clientes nos tribunais do país.
            </p>
            <div className="social-links-list">
              <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Navegação</h4>
            <ul className="footer-links-ul">
              <li><a href="#inicio">Início</a></li>
              <li><a href="#sobre">Institucional</a></li>
              <li><a href="#atuacao">Especialidades</a></li>
              <li><a href="#equipe">Corpo Jurídico</a></li>
              <li><a href="#faq">Perguntas Frequentes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Atuação</h4>
            <ul className="footer-links-ul">
              <li><a href="#atuacao">Direito Corporativo</a></li>
              <li><a href="#atuacao">Direito Civil</a></li>
              <li><a href="#atuacao">Planejamento Familiar</a></li>
              <li><a href="#atuacao">Direito Digital &amp; LGPD</a></li>
              <li><a href="#atuacao">Tributário Estratégico</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Plantão de Urgência</h4>
            <p className="footer-brand-desc">Para medidas liminares de urgência e mandados fora do horário expedito:</p>
            <a href="tel:+5542999990000" className="btn-plantao-editorial">
              <i className="fa-solid fa-phone"></i> +55 (42) 99999-0000
            </a>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="container footer-bottom-flex">
            <p>&copy; 2026 Aurora &amp; Associados Sociedade de Advogados. Todos os direitos reservados. OAB/PR nº 12.345.</p>
            <div>
              <a href="#">Privacidade &amp; Proteção de Dados</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Sucesso */}
      <div className={`modal ${isModalOpen ? 'active' : ''}`} id="success-modal">
        <div className="modal-overlay" onClick={closeModal}></div>
        <div className="modal-card">
          <button className="modal-close-btn" onClick={closeModal} aria-label="Fechar">
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="modal-icon-gold">
            <i className="fa-solid fa-check"></i>
          </div>
          <h3 className="form-title-editorial" style={{ fontSize: '1.7rem', marginBottom: '1rem' }}>
            Solicitação Registrada
          </h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
            Sua mensagem foi transmitida com sigilo prioritário. Nossa assessoria jurídica entrará em contato em até <strong>4 horas úteis</strong>.
          </p>
          <button className="btn btn-gold btn-full" onClick={closeModal}>
            Entendido
          </button>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        className={`scroll-to-top ${isScrollTopVisible ? 'active' : ''}`}
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
      >
        <i className="fa-solid fa-chevron-up"></i>
      </button>
    </>
  );
}

export default App;
