document.addEventListener("DOMContentLoaded", function () {
  // --- PARTE 1: FUNCIONALIDADES CRÍTICAS (ANIMAÇÕES E TEMA) ---
  // Isso garante que o site apareça mesmo se a tradução der erro

  // Theme toggle functionality
  try {
    const themeToggle = document.getElementById("themeToggle");
    const html = document.documentElement;
    const icon = themeToggle ? themeToggle.querySelector("i") : null;

    if (themeToggle && icon) {
      // Check for saved theme preference or prefer-color-scheme
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      // Apply theme based on saved preference or system preference
      if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        html.classList.add("dark");
        icon.classList.replace("fa-moon", "fa-sun");
        document
          .querySelector('meta[name="theme-color"]')
          .setAttribute("content", "#000000");
      }

      // Toggle theme when button is clicked
      themeToggle.addEventListener("click", function () {
        html.classList.toggle("dark");

        // Update the icon
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

    // Close mobile menu when clicking on a link
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

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // --- ANIMAÇÕES DE SCROLL ---
  const header = document.querySelector("header");
  const sections = document.querySelectorAll("section");

  function checkScroll() {
    // Header shadow
    if (header) {
      if (window.scrollY > 0) {
        header.classList.add("shadow-md");
      } else {
        header.classList.remove("shadow-md");
      }
    }

    // Reveal animations for sections
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // Se a seção estiver visível, adiciona classes de animação
      if (sectionTop < windowHeight * 0.85) {
        section.classList.add("opacity-100", "translate-y-0");
        section.classList.remove("opacity-0", "translate-y-4");
      }
    });
  }

  window.addEventListener("scroll", checkScroll);
  // Run on page load immediately
  checkScroll();

  // Add intersection observer for animations (Método moderno)
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100", "translate-y-0");
        entry.target.classList.remove("opacity-0", "translate-y-4");
        // Stop observing once the animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Attach observer
  sections.forEach((section) => observer.observe(section));

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
        about_p1:
          "Developers focused on crafting clean and scalable experiences.",
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
        about_p1:
          "Desenvolvedores focados em criar experiências limpas e escaláveis.",
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
    // Se o botão não existir, para a execução do bloco de tradução, mas não quebra o site
    if (langToggle) {
      // AQUI ESTÁ A MUDANÇA: 'pt' como padrão se não houver localStorage
      let currentLang = localStorage.getItem("lang") || "pt";

      function updateLanguage(lang) {
        // Update button icon
        langToggle.textContent = lang === "en" ? "🇺🇸" : "🇧🇷";

        // Update all text elements with data-translate attribute
        const elements = document.querySelectorAll("[data-translate]");
        elements.forEach((el) => {
          const key = el.getAttribute("data-translate");
          if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
          }
        });

        // Save preference
        localStorage.setItem("lang", lang);
        currentLang = lang;
      }

      // Initialize language
      updateLanguage(currentLang);

      // Toggle language on click
      langToggle.addEventListener("click", () => {
        const newLang = currentLang === "en" ? "pt" : "en";
        updateLanguage(newLang);
      });

      // Form submission handling com Formspree
      const contactForm = document.getElementById("contactForm");
      if (contactForm) {
        contactForm.addEventListener("submit", async function (e) {
          e.preventDefault();

          const button = contactForm.querySelector('button[type="submit"]');
          const originalText = button.textContent;
          const formData = new FormData(contactForm);

          button.textContent = "Enviando..."; // Feedback imediato

          try {
            const response = await fetch("https://formspree.io/f/xlgdaeva", {
              method: "POST",
              body: formData,
              headers: {
                Accept: "application/json",
              },
            });

            if (response.ok) {
              // Sucesso!
              button.textContent = translations[currentLang]["form_sent"]; // Mensagem traduzida
              contactForm.reset();
            } else {
              // Erro no serviço
              button.textContent = "Erro ao enviar.";
            }
          } catch (error) {
            // Erro de rede
            console.error("Erro:", error);
            button.textContent = "Erro de conexão.";
          }

          // Restaura o botão após 3 segundos
          setTimeout(() => {
            button.textContent = translations[currentLang]["form_btn"];
          }, 3000);
        });
      }
    }
  } catch (error) {
    console.error("Erro na tradução:", error);
    // O site continua funcionando mesmo com erro aqui
  }

  // Terminal animation
  const terminalContainer = document.getElementById("terminal-container");
  const terminalContent = document.querySelector(".terminal-content");
  const commandSpan = document.querySelector(".command-text");

  if (terminalContainer && terminalContent && commandSpan) {
    const commandText = "https://github.com/GabrielManciniPinheiro";

    // 1. Adiciona o cursor piscante fixo (assim ele pisca mesmo quando o texto some)
    const cursor = document.createElement("span");
    cursor.className =
      "inline-block w-2 h-5 bg-gray-900 dark:bg-white ml-1 animate-blink align-middle";
    terminalContent.appendChild(cursor);

    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      const currentString = commandText.substring(0, charIndex);
      commandSpan.textContent = currentString;

      // Lógica de Digitar vs Apagar
      if (!isDeleting && charIndex < commandText.length) {
        // Se está digitando e ainda não acabou
        charIndex++;
        setTimeout(typeEffect, 50); // Velocidade de digitação (50ms)
      } else if (isDeleting && charIndex > 0) {
        // Se está apagando e ainda tem texto
        charIndex--;
        setTimeout(typeEffect, 30); // Velocidade de apagar (mais rápido: 30ms)
      } else {
        // Se acabou de digitar OU acabou de apagar

        // Inverte o modo (se estava digitando, passa a apagar, e vice-versa)
        isDeleting = !isDeleting;

        // Define quanto tempo esperar antes de começar a próxima fase
        // Se acabou de digitar: espera 2.5s para o usuário ler
        // Se acabou de apagar: espera 0.5s para começar a digitar de novo
        const waitTime = isDeleting ? 5000 : 500;

        setTimeout(typeEffect, waitTime);
      }
    };

    // Inicia a animação
    typeEffect();
  }
  // --- EFEITO DE SCROLL NO LOGO HERO ---
  const heroLogo = document.getElementById("hero-logo");
  // Pegamos o container do texto (o pai do logo) para centralizar O CONTEÚDO TODO, não só a imagem
  const heroContent = document.querySelector("#hero .max-w-4xl");

  if (heroLogo && heroContent) {
    heroLogo.addEventListener("click", () => {
      // Esta função rola a tela suavemente até que o elemento esteja no centro vertical
      heroContent.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }
});
