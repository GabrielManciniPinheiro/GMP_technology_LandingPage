document.addEventListener("DOMContentLoaded", function () {
  // --- PARTE 1: FUNCIONALIDADES CRÍTICAS (ANIMAÇÕES E TEMA) ---

  // Theme toggle functionality
  try {
    const themeToggle = document.getElementById("themeToggle");
    const html = document.documentElement;
    const icon = themeToggle ? themeToggle.querySelector("i") : null;

    if (themeToggle && icon) {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        html.classList.add("dark");
        icon.classList.replace("fa-moon", "fa-sun");
        document
          .querySelector('meta[name="theme-color"]')
          .setAttribute("content", "#000000");
      }

      themeToggle.addEventListener("click", function () {
        html.classList.toggle("dark");
        if (html.classList.contains("dark")) {
          icon.classList.replace("fa-moon", "fa-sun");
          localStorage.setItem("theme", "dark");
          document
            .querySelector('meta[name="theme-color"]')
            .setAttribute("content", "#000000");
        } else {
          icon.classList.replace("fa-sun", "fa-moon");
          localStorage.setItem("theme", "light");
          document
            .querySelector('meta[name="theme-color"]')
            .setAttribute("content", "#0070f3");
        }
      });
    }
  } catch (e) {
    console.error("Erro no tema:", e);
  }

  // Mobile navigation toggle
  const menuToggle = document.getElementById("menuToggle");
  const closeMenu = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle && closeMenu && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.remove("translate-x-full");
      document.body.classList.add("overflow-hidden");
    });

    closeMenu.addEventListener("click", function () {
      mobileMenu.classList.add("translate-x-full");
      document.body.classList.remove("overflow-hidden");
    });

    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.add("translate-x-full");
        document.body.classList.remove("overflow-hidden");
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });

  // --- ANIMAÇÕES DE SCROLL ---
  const header = document.querySelector("header");
  const sections = document.querySelectorAll("section");

  function checkScroll() {
    if (header) {
      if (window.scrollY > 0) {
        header.classList.add("shadow-md");
      } else {
        header.classList.remove("shadow-md");
      }
    }
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll();

  const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100", "translate-y-0");
        entry.target.classList.remove("opacity-0", "translate-y-4");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // --- LÓGICA DO DROPDOWN DO CURRÍCULO (CORRIGIDA) ---
  const dropdownBtn = document.getElementById("resume-dropdown-btn");
  const resumeMenu = document.getElementById("resume-menu");

  if (dropdownBtn && resumeMenu) {
    const arrowIcon = dropdownBtn.querySelector("svg");

    dropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = resumeMenu.classList.toggle("hidden");

      // Animação da seta
      if (arrowIcon) {
        arrowIcon.style.transform = isHidden
          ? "rotate(0deg)"
          : "rotate(180deg)";
        arrowIcon.style.transition = "transform 0.2s ease";
      }
    });

    // Fecha o menu ao clicar em qualquer lugar da tela
    window.addEventListener("click", () => {
      if (!resumeMenu.classList.contains("hidden")) {
        resumeMenu.classList.add("hidden");
        if (arrowIcon) arrowIcon.style.transform = "rotate(0deg)";
      }
    });
  }

  // --- PARTE 2: TRADUÇÃO ---
  try {
    const translations = {
      en: {
        nav_showcase: "Specialties",
        nav_about: "About Me",
        nav_skills: "Skills",
        nav_projects: "Projects",
        nav_contact: "Contact",
        hero_title_1: "Hi, I'm",
        hero_title_highlight: "Gabriel Mancini Pinheiro",
        hero_title_2: "",
        hero_subtitle_1: "",
        hero_subtitle_bold: "Full-Stack Software Engineer",
        hero_subtitle_2:
          "specializing in the React, Next.js, and TypeScript ecosystem, focused on architecting scalable web platforms.",
        hero_view_projects: "View My Projects",
        hero_learn_more: "Learn About My Journey",
        features_title: "How I Work",
        features_subtitle:
          "Patterns and practices I apply when building digital products.",
        feature_1_title: "Clean Architecture",
        feature_1_desc:
          "Focus on SOLID, Clean Code, and layered architecture to create sustainable and easily scalable systems.",
        feature_2_title: "AI Integration",
        feature_2_desc:
          "Experience connecting LLMs and intelligent tools within web applications to boost workflows.",
        feature_3_title: "Infrastructure & SaaS",
        feature_3_desc:
          "Mastery of modern ecosystems like Vercel, Supabase, Neon DB, and payment gateways like Stripe.",
        feature_4_title: "User Experience",
        feature_4_desc:
          "Fluid interfaces, hybrid SSR/CSR with App Router, and 100% responsive design for any device.",
        about_title: "About Me",
        about_p1:
          "Transforming complex business rules into high-performance software.",
        about_p2:
          "I hold a Bachelor's in Information Systems and have 3 years of professional experience (and 5 years immersed in the ecosystem) building end-to-end applications. My background includes roles in the financial and automation sectors at large corporations like Santander (F1st Digital Services), PwC, and Stefanini Group.",
        about_p3:
          "Currently, I am pursuing a postgraduate degree in Artificial Intelligence and Data Science at Inteli, while dedicating my free time to building real SaaS projects that integrate AI, complex payment methods, and cloud databases.",
        about_contact_btn: "Let's Talk",
        about_resume_btn: "Download Resume",
        skills_title: "Main Stack",
        skills_subtitle:
          "Technologies I work with daily to bring products to life.",
        skill_responsive: "Responsive Design",
        projects_title: "Featured Projects",
        projects_subtitle: "A few real SaaS systems I developed recently.",
        proj_1_title: "Barber SaaS",
        proj_1_desc:
          "A full-stack scheduling platform for barbershops with a real-time admin dashboard and unit management.",
        proj_2_title: "Wellness System",
        proj_2_desc:
          "A SaaS for aesthetic clinics focused on the patient journey with automated email webhooks.",
        proj_3_title: "Totem Fastfoods",
        proj_3_desc:
          "A hybrid POS solution (SSR/CSR) with optimized checkout (no unnecessary data) and direct Stripe integration.",
        contact_title: "Let's Build Something Amazing?",
        contact_subtitle:
          "Whether it's for a new role, a freelance project, or just technical networking.",
        contact_location: "Location",
        form_title: "Send a Direct Message",
        form_name: "Your Name",
        form_message: "Your Message",
        form_btn: "Send Message",
        form_sent: "Message Sent!",
        footer_copy: "© 2026 Gabriel Mancini Pinheiro. All rights reserved.",
      },
      pt: {
        nav_showcase: "Especialidades",
        nav_about: "Sobre Mim",
        nav_skills: "Habilidades",
        nav_projects: "Projetos",
        nav_contact: "Contato",
        hero_title_1: "Olá, eu sou o",
        hero_title_highlight: "Gabriel Mancini Pinheiro",
        hero_title_2: "",
        hero_subtitle_1: "",
        hero_subtitle_bold: "Full-Stack Software Engineer",
        hero_subtitle_2:
          "especializado no ecossistema React, Next.js e TypeScript, focado em arquitetar plataformas web escaláveis.",
        hero_view_projects: "Ver Meus Projetos",
        hero_learn_more: "Conhecer minha trajetória",
        features_title: "Minha Forma de Trabalhar",
        features_subtitle:
          "Padrões e práticas que aplico na construção de produtos digitais.",
        feature_1_title: "Arquitetura Limpa",
        feature_1_desc:
          "Foco em SOLID, Clean Code e divisão em camadas para criar sistemas sustentáveis e fáceis de escalar a longo prazo.",
        feature_2_title: "Integração com IA",
        feature_2_desc:
          "Experiência na conexão de LLMs e ferramentas inteligentes dentro de aplicações web para potencializar fluxos.",
        feature_3_title: "Infraestrutura & SaaS",
        feature_3_desc:
          "Domínio sobre ecossistemas modernos como Vercel, Supabase, Neon DB e gateways de pagamento como Stripe.",
        feature_4_title: "Experiência de Usuário",
        feature_4_desc:
          "Interfaces fluidas, SSR/CSR híbrido com App Router e design 100% responsivo para qualquer dispositivo.",
        about_title: "Sobre Mim",
        about_p1:
          "Transformando regras de negócio complexas em software de alto desempenho.",
        about_p2:
          "Sou bacharel em Sistemas de Informação e atuo há 3 anos profissionalmente (e 5 anos imerso no ecossistema) criando aplicações ponta a ponta. Minha trajetória inclui passagens pelo setor financeiro e de automação em grandes corporações como Santander (F1st Digital Services), PwC e Grupo Stefanini.",
        about_p3:
          "Atualmente, sou pós-graduando em Inteligência Artificial e Data Science no Inteli e dedico parte do meu tempo empreendendo projetos SaaS reais, integrando IA, métodos de pagamento complexos e bancos de dados em nuvem.",
        about_contact_btn: "Vamos conversar",
        about_resume_btn: "Baixar Currículo",
        skills_title: "Minha Stack Principal",
        skills_subtitle:
          "Tecnologias com as quais trabalho diariamente para dar vida aos produtos.",
        skill_responsive: "Design Responsivo",
        projects_title: "Projetos em Destaque",
        projects_subtitle:
          "Alguns dos sistemas SaaS reais que desenvolvi recentemente.",
        proj_1_title: "Barber SaaS",
        proj_1_desc:
          "Plataforma full-stack de agendamento para barbearias com dashboard administrativo em tempo real e gestão de unidades.",
        proj_2_title: "Wellness System",
        proj_2_desc:
          "SaaS voltado para clínicas de estética, focando na jornada do paciente com envios automáticos de e-mails via webhook.",
        proj_3_title: "Totem Fastfoods",
        proj_3_desc:
          "Solução de PDV híbrida (SSR/CSR) com checkout otimizado (sem dados desnecessários) e integração direta com a Stripe.",
        contact_title: "Vamos Construir Algo Incrível?",
        contact_subtitle:
          "Seja para uma nova vaga, um projeto freela ou apenas um networking técnico.",
        contact_location: "Localização",
        form_title: "Envie uma Mensagem Direta",
        form_name: "Seu Nome",
        form_message: "Sua Mensagem",
        form_btn: "Enviar Mensagem",
        form_sent: "Mensagem Enviada!",
        footer_copy:
          "© 2026 Gabriel Mancini Pinheiro. Todos os direitos reservados.",
      },
    };

    const langToggle = document.getElementById("langToggle");
    if (langToggle) {
      let currentLang = localStorage.getItem("lang") || "pt";

      function updateLanguage(lang) {
        langToggle.textContent = lang === "en" ? "🇺🇸" : "🇧🇷";
        const elements = document.querySelectorAll("[data-translate]");
        elements.forEach((el) => {
          const key = el.getAttribute("data-translate");
          if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
          }
        });
        localStorage.setItem("lang", lang);
        currentLang = lang;
      }

      updateLanguage(currentLang);
      langToggle.addEventListener("click", () => {
        updateLanguage(currentLang === "en" ? "pt" : "en");
      });

      const contactForm = document.getElementById("contactForm");
      if (contactForm) {
        contactForm.addEventListener("submit", async function (e) {
          e.preventDefault();
          const button = contactForm.querySelector('button[type="submit"]');
          const formData = new FormData(contactForm);
          button.textContent = "Enviando...";

          try {
            const response = await fetch("https://formspree.io/f/xlgdaeva", {
              method: "POST",
              body: formData,
              headers: { Accept: "application/json" },
            });
            if (response.ok) {
              button.textContent = translations[currentLang]["form_sent"];
              contactForm.reset();
            } else {
              button.textContent = "Erro ao enviar.";
            }
          } catch (error) {
            button.textContent = "Erro de conexão.";
          }
          setTimeout(() => {
            button.textContent = translations[currentLang]["form_btn"];
          }, 3000);
        });
      }
    }
  } catch (error) {
    console.error("Erro na tradução:", error);
  }

  // Terminal animation
  const terminalContent = document.querySelector(".terminal-content");
  const commandSpan = document.querySelector(".command-text");

  if (terminalContent && commandSpan) {
    const commandText = "https://github.com/GabrielManciniPinheiro";
    const cursor = document.createElement("span");
    cursor.className =
      "inline-block w-2 h-5 bg-gray-900 dark:bg-white ml-1 animate-blink align-middle";
    terminalContent.appendChild(cursor);

    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      commandSpan.textContent = commandText.substring(0, charIndex);
      if (!isDeleting && charIndex < commandText.length) {
        charIndex++;
        setTimeout(typeEffect, 50);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 30);
      } else {
        isDeleting = !isDeleting;
        setTimeout(typeEffect, isDeleting ? 5000 : 500);
      }
    };
    typeEffect();
  }

  // Efeito de scroll no logo hero
  const heroLogo = document.getElementById("hero-logo");
  const heroContent = document.querySelector("#hero .max-w-4xl");
  if (heroLogo && heroContent) {
    heroLogo.addEventListener("click", () => {
      heroContent.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
});
