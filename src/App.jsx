import React, { useState, useEffect } from 'react';
import './App.css'; // Importa arquivo limpo para evitar problemas, estilos principais no index.css
import partnerGabriel from './assets/partner_gabriel.jpg';
import partnerHelena from './assets/partner_helena.jpg';

function App() {
  // ==========================================================================
  // ESTADOS DO APP
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
  // SIDE EFFECTS (INTERACTIONS & EVENT LISTENERS)
  // ==========================================================================
  
  // Navbar scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsScrollTopVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // active navigation link highlighter
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
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
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1
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

  // ==========================================================================
  // AÇÕES E MÉTODOS
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
    setActiveFaq(prev => prev === index ? null : index);
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
    
    // Simula envio de dados para o servidor
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
    }, 1800);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
  };

  // Esc Key Modal Closer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <>
      {/* Linha Decorativa no Topo */}
      <div className="top-accent-bar"></div>

      {/* Cabeçalho (Navbar) */}
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="container navbar-container">
          <a href="#inicio" className="logo" onClick={closeMenu}>
            <i className="fa-solid fa-scale-balanced logo-icon"></i>
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
                  Sobre
                </a>
              </li>
              <li>
                <a 
                  href="#atuacao" 
                  className={`nav-link ${activeSection === 'atuacao' ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Áreas de Atuação
                </a>
              </li>
              <li>
                <a 
                  href="#equipe" 
                  className={`nav-link ${activeSection === 'equipe' ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Equipe
                </a>
              </li>
              <li>
                <a 
                  href="#depoimentos" 
                  className={`nav-link ${activeSection === 'depoimentos' ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Depoimentos
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
            <a href="#contato" className="btn btn-gold btn-nav" onClick={closeMenu}>
              Agendar Consulta
            </a>
            <button 
              className={`mobile-toggle ${isMenuOpen ? 'active' : ''}`} 
              id="mobile-toggle" 
              onClick={toggleMenu}
              aria-label="Abrir menu de navegação"
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" id="inicio">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-badge">
              <i className="fa-solid fa-shield-halved"></i> Advocacia de Alta Performance
            </span>
            <h1 className="hero-title">Defesa Intransigente dos Seus Direitos com Rigor e Exclusividade</h1>
            <p className="hero-subtitle">
              Compromisso com a excelência jurídica, soluções estratégicas personalizadas e discrição absoluta para proteger o seu patrimônio e a sua liberdade.
            </p>
            <div className="hero-actions">
              <a href="#contato" className="btn btn-gold btn-large">Agendar Consulta Inicial</a>
              <a href="#atuacao" className="btn btn-outline btn-large">Explorar Especialidades</a>
            </div>
          </div>
          
          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-number">18+</span>
              <span className="stat-label">Anos de Experiência</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">98%</span>
              <span className="stat-label">Casos Resolvidos</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">2.5k+</span>
              <span className="stat-label">Clientes Atendidos</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <a href="#sobre" aria-label="Ir para a próxima seção">
            <i className="fa-solid fa-chevron-down scroll-icon"></i>
          </a>
        </div>
      </section>

      {/* Seção Sobre Nós */}
      <section className="about-section section-padding" id="sobre">
        <div className="container">
          <div className="grid grid-2">
            <div className="about-info reveal-element">
              <div className="section-header">
                <span className="section-subtitle">Sobre o Escritório</span>
                <h2 className="section-title">Tradição Jurídica Aliada ao Dinamismo Contemporâneo</h2>
              </div>
              <p className="about-text">
                Fundado com o propósito de oferecer uma advocacia altamente especializada e artesanal, o escritório <strong>Aurora & Associados</strong> destaca-se pela entrega de soluções jurídicas de alta complexidade.
              </p>
              <p className="about-text">
                Acreditamos que cada causa exige um olhar singular. Não trabalhamos com modelos padronizados; nossos clientes contam com o envolvimento direto dos sócios fundadores em todas as fases do processo, assegurando um atendimento customizado e de alta qualidade técnica.
              </p>
              <div className="signature">
                <div className="signature-details">
                  <span className="signature-name">Gabriel Aurora</span>
                  <span className="signature-title">Sócio-Fundador da Advocacia Aurora</span>
                </div>
              </div>
            </div>
            
            <div className="pillars-grid">
              <div className="pillar-card reveal-element">
                <div className="pillar-icon-wrapper">
                  <i className="fa-solid fa-gavel pillar-icon"></i>
                </div>
                <div>
                  <h3 className="pillar-title">Rigor Técnico</h3>
                  <p className="pillar-desc">Análise profunda da jurisprudência e da doutrina para fundamentar teses sólidas e eficazes nos tribunais.</p>
                </div>
              </div>
              
              <div className="pillar-card reveal-element">
                <div className="pillar-icon-wrapper">
                  <i className="fa-solid fa-lock pillar-icon"></i>
                </div>
                <div>
                  <h3 className="pillar-title">Sigilo Absoluto</h3>
                  <p className="pillar-desc">Garantia estatutária de confidencialidade e segurança de dados, resguardando a privacidade de nossos representados.</p>
                </div>
              </div>
              
              <div className="pillar-card reveal-element">
                <div className="pillar-icon-wrapper">
                  <i className="fa-solid fa-gem pillar-icon"></i>
                </div>
                <div>
                  <h3 className="pillar-title">Atendimento Premium</h3>
                  <p className="pillar-desc">Acesso direto e contínuo aos sócios por canais prioritários, com atualizações em tempo real sobre sua demanda.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section className="services-section section-padding" id="atuacao">
        <div className="container">
          <div className="section-header text-center max-w-600 reveal-element">
            <span className="section-subtitle">Áreas de Especialidade</span>
            <h2 className="section-title">Especialistas nas Demandas Jurídicas mais Complexas</h2>
            <p className="section-desc">Atuação coordenada e multidisciplinar para garantir a máxima segurança em decisões corporativas, patrimoniais e contratuais.</p>
          </div>
          
          <div className="grid grid-3 services-grid">
            <div className="service-card reveal-element">
              <div className="service-icon-box">
                <i className="fa-solid fa-building-columns"></i>
              </div>
              <h3 className="service-title">Direito Corporativo & M&A</h3>
              <p className="service-desc">Consultoria jurídica estratégica para fusões, aquisições, reestruturações societárias e auditorias detalhadas (due diligence).</p>
              <a href="#contato" className="service-link">Consultar Especialista <i className="fa-solid fa-arrow-right-long"></i></a>
            </div>
            
            <div className="service-card reveal-element">
              <div className="service-icon-box">
                <i className="fa-solid fa-file-contract"></i>
              </div>
              <h3 className="service-title">Direito Civil & Contratos</h3>
              <p className="service-desc">Elaboração de acordos comerciais complexos, defesas civis de grande porte e arbitragens para resolução de disputas financeiras.</p>
              <a href="#contato" className="service-link">Consultar Especialista <i className="fa-solid fa-arrow-right-long"></i></a>
            </div>
            
            <div className="service-card reveal-element">
              <div className="service-icon-box">
                <i className="fa-solid fa-laptop-code"></i>
              </div>
              <h3 className="service-title">Direito Digital & LGPD</h3>
              <p className="service-desc">Adequação integral à LGPD, defesa em fraudes digitais, termos de uso, propriedade intelectual e segurança cibernética corporativa.</p>
              <a href="#contato" className="service-link">Consultar Especialista <i className="fa-solid fa-arrow-right-long"></i></a>
            </div>
            
            <div className="service-card reveal-element">
              <div className="service-icon-box">
                <i className="fa-solid fa-vault"></i>
              </div>
              <h3 className="service-title">Planejamento Patrimonial</h3>
              <p className="service-desc">Estruturação de Holdings familiares para redução de impactos fiscais, proteção de bens móveis e imóveis, e partilhas consensuais.</p>
              <a href="#contato" className="service-link">Consultar Especialista <i className="fa-solid fa-arrow-right-long"></i></a>
            </div>
            
            <div className="service-card reveal-element">
              <div className="service-icon-box">
                <i className="fa-solid fa-hotel"></i>
              </div>
              <h3 className="service-title">Mercado Imobiliário de Luxo</h3>
              <p className="service-desc">Assessoria na compra, venda e incorporação de ativos de alto valor, analisando riscos tributários e garantindo a lisura do negócio.</p>
              <a href="#contato" className="service-link">Consultar Especialista <i className="fa-solid fa-arrow-right-long"></i></a>
            </div>
            
            <div className="service-card reveal-element">
              <div className="service-icon-box">
                <i className="fa-solid fa-coins"></i>
              </div>
              <h3 className="service-title">Direito Tributário</h3>
              <p className="service-desc">Defesas administrativas e judiciais contra autuações federais ou estaduais, e planejamento fiscal para redução legal de tributos.</p>
              <a href="#contato" className="service-link">Consultar Especialista <i className="fa-solid fa-arrow-right-long"></i></a>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="team-section section-padding" id="equipe">
        <div className="container">
          <div className="section-header text-center max-w-600 reveal-element">
            <span className="section-subtitle">Corpo Jurídico</span>
            <h2 className="section-title">Sócios Especialistas Liderando sua Causa</h2>
            <p className="section-desc">Advogados sêniores com sólida formação acadêmica e histórico comprovado de êxito em tribunais superiores.</p>
          </div>
          
          <div className="grid grid-2 team-grid">
            <div className="team-card reveal-element">
              <div className="team-img-wrapper">
                <img src={partnerGabriel} alt="Dr. Gabriel Aurora" className="team-img" />
              </div>
              <div className="team-info">
                <span className="partner-role">Sócio-Fundador</span>
                <h3 className="partner-name">Dr. Gabriel Aurora</h3>
                <p className="partner-specialty">Direito Corporativo & Tributário</p>
                <p className="partner-bio">
                  Mestre em Direito Comercial pela Universidade de São Paulo (USP). Mais de 18 anos de atuação defendendo conglomerados empresariais nacionais e internacionais em disputas societárias de alta complexidade.
                </p>
                <div className="partner-credentials">
                  <span>OAB/PR 14.892</span>
                </div>
              </div>
            </div>
            
            <div className="team-card reveal-element">
              <div className="team-img-wrapper">
                <img src={partnerHelena} alt="Dra. Helena Santos" className="team-img" />
              </div>
              <div className="team-info">
                <span className="partner-role">Sócia Principal</span>
                <h3 className="partner-name">Dra. Helena Santos</h3>
                <p className="partner-specialty">Direito Civil & Proteção de Dados</p>
                <p className="partner-bio">
                  Especialista em Direito Digital e mestre pela Fundação Getulio Vargas (FGV). Atuação focada em contencioso civil de alta escala e consultoria avançada em conformidade digital para o setor financeiro.
                </p>
                <div className="partner-credentials">
                  <span>OAB/PR 23.140</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="testimonials-section section-padding" id="depoimentos">
        <div className="container">
          <div className="section-header text-center max-w-600 reveal-element">
            <span className="section-subtitle">Reconhecimento</span>
            <h2 className="section-title">O que Dizem Nossos Clientes</h2>
            <p className="section-desc">A confiança de quem conta com nossa assessoria jurídica nos momentos mais decisivos.</p>
          </div>
          
          <div className="grid grid-3 testimonials-grid">
            <div className="testimonial-card reveal-element">
              <div className="stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p className="testimonial-quote">
                "O trabalho da Aurora & Associados no processo de M&A do nosso grupo foi cirúrgico. Demonstraram um rigor técnico impecável e total disponibilidade nos momentos cruciais do fechamento do contrato."
              </p>
              <div className="testimonial-client">
                <span className="client-name">D. R. V.</span>
                <span className="client-company">CEO de Holding de Infraestrutura</span>
              </div>
            </div>
            
            <div className="testimonial-card reveal-element">
              <div className="stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p className="testimonial-quote">
                "Contratamos o escritório para estruturar nossa holding patrimonial. A equipe conduziu tudo de forma discreta e humanizada, mitigando riscos futuros e proporcionando paz de espírito para nossa família."
              </p>
              <div className="testimonial-client">
                <span className="client-name">Família Albuquerque</span>
                <span className="client-company">Clientes de Planejamento Sucessório</span>
              </div>
            </div>
            
            <div className="testimonial-card reveal-element">
              <div className="stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p className="testimonial-quote">
                "A atuação da Dra. Helena na adequação do nosso software financeiro à LGPD e segurança de dados foi fantástica. Evitamos passivos regulatórios pesados graças ao dinamismo e competência do escritório."
              </p>
              <div className="testimonial-client">
                <span className="client-name">M. S. G.</span>
                <span className="client-company">Diretor de Tecnologia de Fintech</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="faq-section section-padding" id="faq">
        <div className="container max-w-800">
          <div className="section-header text-center reveal-element">
            <span className="section-subtitle">Dúvidas Comuns</span>
            <h2 className="section-title">Perguntas Frequentes</h2>
            <p className="section-desc">Entenda como funciona o primeiro contato e a dinâmica de atendimento do escritório.</p>
          </div>
          
          <div className="faq-accordion">
            <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(0)}>
                <span>Como posso agendar a primeira consulta com um especialista?</span>
                <i className="fa-solid fa-chevron-down faq-icon"></i>
              </button>
              <div 
                className="faq-answer"
                style={{ maxHeight: activeFaq === 0 ? '300px' : '0px' }}
              >
                <div className="faq-answer-content">
                  <p>Você pode agendar preenchendo o formulário de contato abaixo ou clicando no botão "Agendar Consulta" no topo. A nossa equipe de triagem retornará o seu contato em até 4 horas comerciais para marcar um atendimento presencial ou online por videoconferência segura.</p>
                </div>
              </div>
            </div>
            
            <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(1)}>
                <span>Como são calculados os honorários advocatícios?</span>
                <i className="fa-solid fa-chevron-down faq-icon"></i>
              </button>
              <div 
                className="faq-answer"
                style={{ maxHeight: activeFaq === 1 ? '300px' : '0px' }}
              >
                <div className="faq-answer-content">
                  <p>Os honorários são avaliados de forma transparente e individualizada, com base na complexidade e valor econômico da causa, seguindo estritamente as diretrizes da tabela de honorários recomendada pela Ordem dos Advogados do Brasil (OAB). Todo o escopo financeiro é detalhado na proposta inicial de serviços antes de iniciarmos qualquer trabalho.</p>
                </div>
              </div>
            </div>
            
            <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(2)}>
                <span>O escritório atua em processos de outros estados além de São Paulo?</span>
                <i className="fa-solid fa-chevron-down faq-icon"></i>
              </button>
              <div 
                className="faq-answer"
                style={{ maxHeight: activeFaq === 2 ? '300px' : '0px' }}
              >
                <div className="faq-answer-content">
                  <p>Sim. Com a digitalização completa do judiciário (processo eletrônico), atuamos em todo o território nacional, acompanhando processos in loco ou remotamente em qualquer Tribunal de Justiça, Tribunais Regionais e Cortes Superiores (STJ e STF), contando ainda com advogados correspondentes em pontos estratégicos para diligências presenciais.</p>
                </div>
              </div>
            </div>
            
            <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(3)}>
                <span>Quais são os mecanismos para garantir o sigilo das informações compartilhadas?</span>
                <i className="fa-solid fa-chevron-down faq-icon"></i>
              </button>
              <div 
                className="faq-answer"
                style={{ maxHeight: activeFaq === 3 ? '300px' : '0px' }}
              >
                <div className="faq-answer-content">
                  <p>Mantemos conformidade rigorosa com o sigilo profissional garantido pela OAB. Além disso, utilizamos sistemas corporativos de armazenamento criptografado na nuvem com controle de acessos estrito por duplo fator, garantindo que somente a equipe diretamente ligada à sua demanda tenha acesso aos documentos e informações.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato & Formulário */}
      <section className="contact-section section-padding" id="contato">
        <div className="container">
          <div className="grid grid-2">
            {/* Info de Contato */}
            <div className="contact-info reveal-element">
              <div className="section-header">
                <span className="section-subtitle">Canais de Atendimento</span>
                <h2 className="section-title">Inicie sua Defesa Jurídica Hoje Mesmo</h2>
                <p className="section-desc">Agende uma reunião estratégica sigilosa. Escolha entre atendimento presencial na nossa sede ou uma chamada de vídeo criptografada.</p>
              </div>
              
              <div className="contact-details-list">
                <div className="contact-item">
                  <div className="contact-icon-box">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">Telefone Direto</span>
                    <a href="tel:+551130004000" className="contact-value">+55 (11) 3000-4000</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon-box">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">E-mail Corporativo</span>
                    <a href="mailto:contato@auroraadvocacia.com.br" className="contact-value">contato@auroraadvocacia.com.br</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon-box">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">Nossa Sede</span>
                    <span className="contact-value">Rua Senador Pinheiro Machado, 1800 - 2º Andar<br />Centro - Guarapuava / PR - CEP 85010-100</span>
                  </div>
                </div>
              </div>
              
              <div className="oab-notice">
                <i className="fa-solid fa-scale-unbalanced-flip oab-icon"></i>
                <p>Aurora & Associados Sociedade de Advogados está devidamente registrada na Seccional da Ordem dos Advogados do Brasil sob o nº 12.345/PR.</p>
              </div>
            </div>
            
            {/* Formulário de Contato */}
            <div className="contact-form-wrapper reveal-element">
              <h3 className="form-title">Agendar Reunião de Triagem</h3>
              <p className="form-subtitle">Preencha com seus dados primários e entraremos em contato.</p>
              
              <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nome Completo</label>
                  <div className="input-wrapper">
                    <i className="fa-regular fa-user input-icon"></i>
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
                
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="email">E-mail Profissional</label>
                    <div className="input-wrapper">
                      <i className="fa-regular fa-envelope input-icon"></i>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Ex: joao@empresa.com" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Telefone / WhatsApp</label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-phone-flip input-icon"></i>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(11) 99999-9999" 
                        required 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Área de Interesse</label>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-list-check input-icon"></i>
                    <select 
                      id="subject" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Selecione a área principal...</option>
                      <option value="corporativo">Direito Corporativo & M&A</option>
                      <option value="civil">Direito Civil & Contratos</option>
                      <option value="digital">Direito Digital & LGPD</option>
                      <option value="patrimonial">Planejamento Patrimonial</option>
                      <option value="imobiliario">Mercado Imobiliário de Luxo</option>
                      <option value="tributario">Direito Tributário</option>
                      <option value="outros">Outros Casos Complexos</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Descrição Resumida (Opcional)</label>
                  <div className="input-wrapper">
                    <i className="fa-regular fa-message input-icon textarea-icon"></i>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4" 
                      placeholder="Descreva brevemente sua situação com total sigilo. Evite detalhes sensíveis antes da reunião."
                    ></textarea>
                  </div>
                </div>
                
                <div className="form-checkbox">
                  <input 
                    type="checkbox" 
                    id="privacy" 
                    name="privacy" 
                    checked={formData.privacy}
                    onChange={handleInputChange}
                    required 
                  />
                  <label htmlFor="privacy">Estou ciente de que as informações enviadas são confidenciais e protegidas de acordo com as normas da OAB e a LGPD.</label>
                </div>
                
                <button type="submit" className="btn btn-gold btn-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span>Enviando Dados Criptografados...</span>
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    </>
                  ) : (
                    <>
                      <span>Enviar Solicitação de Consulta</span>
                      <i className="fa-solid fa-paper-plane"></i>
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
        <div className="container footer-top">
          <div className="footer-brand">
            <a href="#inicio" className="logo footer-logo">
              <i className="fa-solid fa-scale-balanced logo-icon"></i>
              <div className="logo-text">
                <span className="brand-name">AURORA</span>
                <span className="brand-sub">ASSOCIADOS</span>
              </div>
            </a>
            <p className="footer-brand-desc">Compromisso com a ética, excelência acadêmica e resultados consistentes. Defesa premium e personalizada nos tribunais de todo o Brasil.</p>
            <div className="social-links">
              <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4 className="footer-title">Navegação</h4>
            <ul>
              <li><a href="#inicio">Início</a></li>
              <li><a href="#sobre">Sobre Nós</a></li>
              <li><a href="#atuacao">Áreas de Atuação</a></li>
              <li><a href="#equipe">Nossa Equipe</a></li>
              <li><a href="#faq">Perguntas Frequentes</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4 className="footer-title">Áreas</h4>
            <ul>
              <li><a href="#atuacao">Direito Corporativo</a></li>
              <li><a href="#atuacao">Direito Civil</a></li>
              <li><a href="#atuacao">Direito Digital & LGPD</a></li>
              <li><a href="#atuacao">Planejamento Familiar</a></li>
              <li><a href="#atuacao">Tributário Estratégico</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4 className="footer-title">Contato de Plantão</h4>
            <p className="footer-plantao">Para emergências jurídicas fora do horário comercial (ex: prisões, mandados ou liminares urgentes):</p>
            <a href="tel:+5511999990000" className="btn-plantao"><i className="fa-solid fa-phone"></i> +55 (11) 99999-0000</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="container footer-bottom-container">
            <p className="copyright">&copy; 2026 Aurora & Associados. Todos os direitos reservados. OAB/PR nº 12.345.</p>
            <div className="legal-links">
              <a href="#">Políticas de Privacidade</a>
              <span className="divider">|</span>
              <a href="#">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Sucesso */}
      <div className={`modal ${isModalOpen ? 'active' : ''}`} id="success-modal">
        <div className="modal-overlay" id="modal-overlay" onClick={closeModal}></div>
        <div className="modal-content">
          <button className="modal-close" id="modal-close" onClick={closeModal} aria-label="Fechar modal">
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="modal-icon">
            <i className="fa-solid fa-check-double"></i>
          </div>
          <h3 className="modal-title">Mensagem Recebida com Sucesso</h3>
          <p className="modal-desc">
            Sua solicitação de triagem foi registrada em nosso canal prioritário. Uma assessora jurídica entrará em contato com você em até <strong>4 horas úteis</strong>.
          </p>
          <div className="modal-footer">
            <button className="btn btn-gold btn-close-modal" onClick={closeModal} id="btn-close-modal">
              Entendido
            </button>
          </div>
        </div>
      </div>

      {/* Botão Scroll to Top */}
      <button 
        className={`scroll-to-top ${isScrollTopVisible ? 'active' : ''}`} 
        id="scroll-to-top" 
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
      >
        <i className="fa-solid fa-chevron-up"></i>
      </button>
    </>
  );
}

export default App;
