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
        nav_showcase: "Showcase",
        nav_about: "About",
        nav_skills: "Skills",
        nav_projects: "Projects",
        nav_contact: "Contact",
        hero_title_1: "We Deliver",
        hero_title_highlight: "Scalable Digital Solutions",
        hero_title_2: "for your business",
        hero_subtitle_1: "Creating",
        hero_subtitle_bold: "high-quality web applications",
        hero_subtitle_2:
          "with modern tools and best practices for exceptional user experiences.",
        hero_view_projects: "View Projects",
        hero_learn_more: "Learn More",
        features_title: "Toolkit",
        features_subtitle:
          "Everything needed to build great products on the web.",
        feature_1_title: "Modern UI Design",
        feature_1_desc:
          "Creating beautiful, responsive interfaces that look great on any device using the latest design trends.",
        feature_2_title: "Clean Code",
        feature_2_desc:
          "Writing maintainable, scalable, and efficient code following best practices and modern development standards.",
        feature_3_title: "Performance Optimization",
        feature_3_desc:
          "Ensuring fast load times and smooth experiences through efficient code and asset optimization.",
        feature_4_title: "Responsive Development",
        feature_4_desc:
          "Building websites that work flawlessly across all screen sizes, from phones to large displays.",
        about_title: "About Us",
        about_p1: "Focused on crafting clean and scalable experiences.",
        about_p2:
          "We build responsive websites that are fast, easy to use, and follow best coding practices. Our experience includes React, Next.js, TypeScript, HTML, CSS, JavaScript, and modern frameworks to create dynamic interfaces with clean code.",
        about_p3: "CEO - Gabriel Mancin Pinheiro",
        about_contact_btn: "Contact Us",
        about_resume_btn: "Download Resume",
        skills_title: "Main Skills",
        skills_subtitle:
          "Technologies and tools we use to bring products to life",
        skill_responsive: "Responsive Design",
        projects_title: "Featured Projects",
        projects_subtitle: "Check out some of our recent work",
        proj_1_title: "GMP Barber",
        proj_1_desc:
          "A modern SaaS for barbershop scheduling with a real-time administrative dashboard.",
        proj_2_title: "GMP Wellness",
        proj_2_desc:
          "Scheduling SaaS for aesthetic clinics with a real-time administrative dashboard and confirmation emails.",
        proj_3_title: "GMP Fastfoods",
        proj_3_desc:
          "A self-service kiosk system for fast foods integrated with a payment gateway!",
        contact_title: "Get In Touch",
        contact_subtitle: "Interested in creating your solution? Let's talk!",
        contact_location: "Location",
        form_title: "Send a Message",
        form_name: "Name",
        form_message: "Message",
        form_btn: "Send Message",
        form_sent: "Message Sent!",
        footer_copy: "All rights reserved.",
      },
      pt: {
        nav_showcase: "Vitrine",
        nav_about: "Sobre",
        nav_skills: "Habilidades",
        nav_projects: "Projetos",
        nav_contact: "Contato",
        hero_title_1: "Entregamos",
        hero_title_highlight: "Soluções Digitais Escaláveis",
        hero_title_2: "para o seu negócio",
        hero_subtitle_1: "Criando",
        hero_subtitle_bold: "aplicações web de alta qualidade",
        hero_subtitle_2:
          "com ferramentas modernas e as melhores práticas para experiências excepcionais.",
        hero_view_projects: "Ver Projetos",
        hero_learn_more: "Saiba Mais",
        features_title: " Kit de Ferramentas",
        features_subtitle:
          "Tudo o que é necessário para construir ótimos produtos na web.",
        feature_1_title: "Design de UI Moderno",
        feature_1_desc:
          "Criando interfaces bonitas e responsivas que ficam ótimas em qualquer dispositivo usando as últimas tendências.",
        feature_2_title: "Código Limpo",
        feature_2_desc:
          "Escrevendo código sustentável, escalável e eficiente seguindo as melhores práticas e padrões modernos.",
        feature_3_title: "Otimização de Performance",
        feature_3_desc:
          "Garantindo carregamento rápido e experiências fluidas através de código e assets otimizados.",
        feature_4_title: "Desenvolvimento Responsivo",
        feature_4_desc:
          "Construindo sites que funcionam perfeitamente em todos os tamanhos de tela, de celulares a monitores grandes.",
        about_title: "Sobre Nós",
        about_p1: "Focados em criar experiências limpas e escaláveis.",
        about_p2:
          "Construimos sites responsivos que são rápidos, fáceis de usar e seguem as melhores práticas de codificação. Nossa experiência inclui React, Next.js, Typescript, HTML, CSS, JavaScript e frameworks modernos para criar interfaces dinâmicas com código limpo.",
        about_p3: "CEO - Gabriel Mancin Pinheiro",
        about_contact_btn: "Fale Conosco",
        about_resume_btn: "Baixar Currículo",
        skills_title: "Principais Habilidades",
        skills_subtitle:
          "Tecnologias e ferramentas que usamos para dar vida a produtos",
        skill_responsive: "Design Responsivo",
        projects_title: "Projetos em Destaque",
        projects_subtitle: "Confira alguns de nossos trabalhos recentes",
        proj_1_title: "GMP Barber",
        proj_1_desc:
          "Um Saas moderno de agendamento para barbearias com dashboard administrativo em tempo real.",
        proj_2_title: "GMP Wellness",
        proj_2_desc:
          "Saas de agendamento para clinicas de estética com dashboard administrativo em tempo real e envio de emails de confirmação.",
        proj_3_title: "GMP Fastfoods",
        proj_3_desc:
          "Um sistema de totem de pedidos para fastfoods integrado com gateway de pagamento!",
        contact_title: "Entre em Contato",
        contact_subtitle: "Interessado em criar sua solução? Vamos conversar!",
        contact_location: "Localização",
        form_title: "Envie uma Mensagem",
        form_name: "Nome",
        form_message: "Mensagem",
        form_btn: "Enviar Mensagem",
        form_sent: "Mensagem Enviada!",
        footer_copy: "Todos os direitos reservados.",
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
