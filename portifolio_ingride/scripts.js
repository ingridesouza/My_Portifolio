document.addEventListener("DOMContentLoaded", function() {
  // AOS
  AOS.init({
    duration: 1000,
    once: true,
  });

  const heroTitle = document.getElementById('hero-title');
  heroTitle.classList.add('typing-effect');
  
  const text = "Back-End Developer";
  heroTitle.textContent = ''; 
  let index = 0;

  function typeWriter() {
    if (index < text.length) {
      heroTitle.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 100); 
    } else {
      // Mantém o cursor piscando mesmo após terminar
      heroTitle.style.borderRight = 'none';
    }
  }

  typeWriter();
});

//-------------------Traduções


  const translations = {
    'pt-BR': {
      'hero-title': 'Desenvolvedora Back-End',
      'hero-location': 'Salvador, Bahia - Brasil',
      'about-text': 'Olá, eu sou Ingride Souza e tenho 19 anos. Minha jornada nos estudos é movida pela paixão por programação e tecnologia. Atualmente, estou cursando Análise e Desenvolvimento de Sistemas na UniRuy Wyden, com previsão de término em 2025.2.',
      'skills-title': 'Habilidades',
      'soft-skills-title': 'Soft Skills',
      'soft-skills-list': ['Trabalho em equipe', 'Comunicação clara', 'Aprendizado rápido', 'Proatividade', 'Atenção aos detalhes', 'Inteligência emocional'],
      'hard-skills-title': 'Hard Skills',
      'hard-skills-list': ['Proficiente em JavaScript', 'Sistema de Controle de Versão Git', 'HTML5, CSS3 e Bootstrap', 'Programação Avançada em Python', 'Gerenciamento de Banco de Dados SQL', 'Desenvolvimento com FLASK', 'Desenvolvimento e Implantação de Chatbots', 'Fundamentos de Inteligência Artificial (AI)', 'TypeScript', 'Arquitetura de Software'],
      'competencies-title': 'Principais Competências',
      'competencies-list': ['Threads', 'Chatbots', 'Automação de processos'],
      'tools-title': 'Ferramentas',
      'tools-list': ['Visual Studio Code (VS Code)', 'Workbench', 'PyCharm (IDE)', 'WordPress CMS'],
      'certifications-title': 'Certificações',
      'certifications-list': ['Workshop - Criando o seu primeiro site', 'Microsoft Excel 2016 - Intermediário', 'Node.js', 'Customer Service: Problem-Solving and Troubleshooting', 'Desvendando SQL'],
      'experience-title': 'Experiência',
      'experience-1-title': 'Leiaute Propaganda',
      'experience-1-role': 'Desenvolvedora de software',
      'experience-1-description': 'Atuação no desenvolvimento de software, contribuindo com soluções em Front-End e Back-End, além de suporte na automação de processos e chatbots.',
      'experience-1-technologies': 'Tecnologias e ferramentas:',
      'experience-1-tech-list': ['Python', 'JavaScript', 'SQL', 'Selenium', 'TypeScript', 'Inteligência Artificial', 'Zapier', 'Wordpress', 'Git Version Control'],
      'experience-2-title': 'INFINITY SCHOOL - Visual Art Creative Center',
      'experience-2-role': 'Monitora',
      'experience-2-description': 'Suporte a alunos nos conteúdos de programação Full Stack, auxílio em resolução de problemas e orientação em projetos práticos.',
      'college-text': 'Sou estudante de <strong>Análise e Desenvolvimento de Sistemas</strong> na <strong>UniFavip Wyden</strong>, dedicada a aprimorar continuamente meus conhecimentos na área de tecnologia. Além dos estudos acadêmicos, busco cursos intensivos de programação para me manter atualizada.',
      'degree-title': 'BACHARELADO',
      'degree-name': 'Análise e Desenvolvimento de Sistemas',
      'degree-institution': 'UniFavip Wyden',
      'degree-period': 'Março de 2023 - Novembro de 2025',
      'courses-title': 'CURSOS INTENSIVOS',
      'courses-description': 'Programação Full Stack na <strong>INFINITY SCHOOL</strong> (Agosto de 2023 - Fevereiro de 2024).',
      'courses-additional': 'Cursos e formações complementares para expandir meu conhecimento em diversas áreas de TI.',
      'contact-title': 'Contato',
      'contact-phone': 'Telefone:',
      'contact-email': 'Email:',
      'contact-linkedin': 'LinkedIn:',
      'contact-github': 'GitHub:',
      'contact-portfolio': 'Portfólio:',
      'footer-text': '&copy; 2025 - Desenvolvido por Ingride Souza',
      'nav-skills': 'Habilidades',
      'nav-experience': 'Experiência',
      'nav-college': 'Educação',
      'nav-contact': 'Contato',
      'skill-1': 'Python',
      'skill-2': 'Desenvolvimento Web',
      'skill-3': 'Computação em Nuvem',
      'skill-4': 'Java',
      'skill-5': 'Banco de Dados',
      'skill-6': 'Redes',
      'skill-7': 'Python',
      'skill-8': 'JavaScript',
      'skill-9': 'HTML',
      'skill-10': 'CSS',
      'skill-11': 'Node.js',
      'skill-12': 'React'
    },
    'pt-PT': {
      'hero-title': 'Desenvolvedora Back-End',
      'hero-location': 'Salvador, Bahia - Brasil',
      'about-text': 'Olá, eu sou Ingride Souza e tenho 19 anos. A minha jornada nos estudos é movida pela paixão por programação e tecnologia. Atualmente, estou a cursar Análise e Desenvolvimento de Sistemas na UniRuy Wyden, com previsão de término em 2025.2.',
      'skills-title': 'Competências',
      'soft-skills-title': 'Soft Skills',
      'soft-skills-list': ['Trabalho em equipa', 'Comunicação clara', 'Aprendizagem rápida', 'Proatividade', 'Atenção aos detalhes', 'Inteligência emocional'],
      'hard-skills-title': 'Hard Skills',
      'hard-skills-list': ['Proficiente em JavaScript', 'Sistema de Controlo de Versão Git', 'HTML5, CSS3 e Bootstrap', 'Programação Avançada em Python', 'Gestão de Base de Dados SQL', 'Desenvolvimento com FLASK', 'Desenvolvimento e Implementação de Chatbots', 'Fundamentos de Inteligência Artificial (AI)', 'TypeScript', 'Arquitetura de Software'],
      'competencies-title': 'Principais Competências',
      'competencies-list': ['Threads', 'Chatbots', 'Automatização de processos'],
      'tools-title': 'Ferramentas',
      'tools-list': ['Visual Studio Code (VS Code)', 'Workbench', 'PyCharm (IDE)', 'WordPress CMS'],
      'certifications-title': 'Certificações',
      'certifications-list': ['Workshop - Criando o seu primeiro site', 'Microsoft Excel 2016 - Intermédio', 'Node.js', 'Customer Service: Problem-Solving and Troubleshooting', 'Desvendando SQL'],
      'experience-title': 'Experiência',
      'experience-1-title': 'Leiaute Propaganda',
      'experience-1-role': 'Desenvolvedora de software',
      'experience-1-description': 'Atuação no desenvolvimento de software, contribuindo com soluções em Front-End e Back-End, além de suporte na automatização de processos e chatbots.',
      'experience-1-technologies': 'Tecnologias e ferramentas:',
      'experience-1-tech-list': ['Python', 'JavaScript', 'SQL', 'Selenium', 'TypeScript', 'Inteligência Artificial', 'Zapier', 'Wordpress', 'Git Version Control'],
      'experience-2-title': 'INFINITY SCHOOL - Visual Art Creative Center',
      'experience-2-role': 'Monitora',
      'experience-2-description': 'Suporte a alunos nos conteúdos de programação Full Stack, auxílio na resolução de problemas e orientação em projetos práticos.',
      'college-text': 'Sou estudante de <strong>Análise e Desenvolvimento de Sistemas</strong> na <strong>UniFavip Wyden</strong>, dedicada a aprimorar continuamente os meus conhecimentos na área de tecnologia. Além dos estudos académicos, busco cursos intensivos de programação para me manter atualizada.',
      'degree-title': 'LICENCIATURA',
      'degree-name': 'Análise e Desenvolvimento de Sistemas',
      'degree-institution': 'UniFavip Wyden',
      'degree-period': 'Março de 2023 - Novembro de 2025',
      'courses-title': 'CURSOS INTENSIVOS',
      'courses-description': 'Programação Full Stack na <strong>INFINITY SCHOOL</strong> (Agosto de 2023 - Fevereiro de 2024).',
      'courses-additional': 'Cursos e formações complementares para expandir o meu conhecimento em diversas áreas de TI.',
      'contact-title': 'Contacto',
      'contact-phone': 'Telefone:',
      'contact-email': 'Email:',
      'contact-linkedin': 'LinkedIn:',
      'contact-github': 'GitHub:',
      'contact-portfolio': 'Portfólio:',
      'footer-text': '&copy; 2025 - Desenvolvido por Ingride Souza',
      'nav-skills': 'Competências',
      'nav-experience': 'Experiência',
      'nav-college': 'Educação',
      'nav-contact': 'Contacto',
      'skill-1': 'Python',
      'skill-2': 'Desenvolvimento Web',
      'skill-3': 'Computação em Nuvem',
      'skill-4': 'Java',
      'skill-5': 'Base de Dados',
      'skill-6': 'Redes',
      'skill-7': 'Python',
      'skill-8': 'JavaScript',
      'skill-9': 'HTML',
      'skill-10': 'CSS',
      'skill-11': 'Node.js',
      'skill-12': 'React'
    },
    'en': {
      'hero-title': 'Back-End Developer',
      'hero-location': 'Salvador, Bahia - Brazil',
      'about-text': 'Hello, I am Ingride Souza, and I am 19 years old. My journey in studies is driven by a passion for programming and technology. Currently, I am pursuing a degree in Systems Analysis and Development at UniRuy Wyden, with an expected completion in 2025.2.',
      'skills-title': 'Skills',
      'soft-skills-title': 'Soft Skills',
      'soft-skills-list': ['Teamwork', 'Clear communication', 'Fast learning', 'Proactivity', 'Attention to detail', 'Emotional intelligence'],
      'hard-skills-title': 'Hard Skills',
      'hard-skills-list': ['Proficient in JavaScript', 'Git Version Control System', 'HTML5, CSS3, and Bootstrap', 'Advanced Python Programming', 'SQL Database Management', 'FLASK Framework Development', 'Chatbot Development and Deployment', 'Artificial Intelligence (AI) Fundamentals', 'TypeScript', 'Software Architecture'],
      'competencies-title': 'Main Competencies',
      'competencies-list': ['Threads', 'Chatbots', 'Process automation'],
      'tools-title': 'Tools',
      'tools-list': ['Visual Studio Code (VS Code)', 'Workbench', 'PyCharm (IDE)', 'WordPress CMS'],
      'certifications-title': 'Certifications',
      'certifications-list': ['Workshop - Creating your first website', 'Microsoft Excel 2016 - Intermediate', 'Node.js', 'Customer Service: Problem-Solving and Troubleshooting', 'Unveiling SQL'],
      'experience-title': 'Experience',
      'experience-1-title': 'Leiaute Propaganda',
      'experience-1-role': 'Software Developer',
      'experience-1-description': 'Working on software development, contributing to Front-End and Back-End solutions, as well as supporting process automation and chatbots.',
      'experience-1-technologies': 'Technologies and tools:',
      'experience-1-tech-list': ['Python', 'JavaScript', 'SQL', 'Selenium', 'TypeScript', 'Artificial Intelligence', 'Zapier', 'Wordpress', 'Git Version Control'],
      'experience-2-title': 'INFINITY SCHOOL - Visual Art Creative Center',
      'experience-2-role': 'Tutor',
      'experience-2-description': 'Supporting students in Full Stack programming content, assisting in problem-solving, and guiding practical projects.',
      'college-text': 'I am a student of <strong>Systems Analysis and Development</strong> at <strong>UniFavip Wyden</strong>, dedicated to continuously improving my knowledge in the field of technology. In addition to academic studies, I seek intensive programming courses to stay updated.',
      'degree-title': 'BACHELOR\'S DEGREE',
      'degree-name': 'Systems Analysis and Development',
      'degree-institution': 'UniFavip Wyden',
      'degree-period': 'March 2023 - November 2025',
      'courses-title': 'INTENSIVE COURSES',
      'courses-description': 'Full Stack Programming at <strong>INFINITY SCHOOL</strong> (August 2023 - February 2024).',
      'courses-additional': 'Courses and additional training to expand my knowledge in various areas of IT.',
      'contact-title': 'Contact',
      'contact-phone': 'Phone:',
      'contact-email': 'Email:',
      'contact-linkedin': 'LinkedIn:',
      'contact-github': 'GitHub:',
      'contact-portfolio': 'Portfolio:',
      'footer-text': '&copy; 2025 - Developed by Ingride Souza',
      'nav-skills': 'Skills',
      'nav-experience': 'Experience',
      'nav-college': 'Education',
      'nav-contact': 'Contact',
      'skill-1': 'Python',
      'skill-2': 'Web Development',
      'skill-3': 'Cloud Computing',
      'skill-4': 'Java',
      'skill-5': 'Database',
      'skill-6': 'Networks',
      'skill-7': 'Python',
      'skill-8': 'JavaScript',
      'skill-9': 'HTML',
      'skill-10': 'CSS',
      'skill-11': 'Node.js',
      'skill-12': 'React'
    },
    'fr': {
      'hero-title': 'Développeuse Back-End',
      'hero-location': 'Salvador, Bahia - Brésil',
      'about-text': 'Bonjour, je suis Ingride Souza et j\'ai 19 ans. Mon parcours d\'études est motivé par une passion pour la programmation et la technologie. Actuellement, je suis un cursus en Analyse et Développement de Systèmes à UniRuy Wyden, avec une fin prévue en 2025.2.',
      'skills-title': 'Compétences',
      'soft-skills-title': 'Soft Skills',
      'soft-skills-list': ['Travail d\'équipe', 'Communication claire', 'Apprentissage rapide', 'Proactivité', 'Attention aux détails', 'Intelligence émotionnelle'],
      'hard-skills-title': 'Hard Skills',
      'hard-skills-list': ['Compétent en JavaScript', 'Système de contrôle de version Git', 'HTML5, CSS3 et Bootstrap', 'Programmation avancée en Python', 'Gestion de base de données SQL', 'Développement avec FLASK', 'Développement et déploiement de chatbots', 'Fondamentaux de l\'intelligence artificielle (IA)', 'TypeScript', 'Architecture logicielle'],
      'competencies-title': 'Compétences principales',
      'competencies-list': ['Threads', 'Chatbots', 'Automatisation des processus'],
      'tools-title': 'Outils',
      'tools-list': ['Visual Studio Code (VS Code)', 'Workbench', 'PyCharm (IDE)', 'WordPress CMS'],
      'certifications-title': 'Certifications',
      'certifications-list': ['Atelier - Créer votre premier site web', 'Microsoft Excel 2016 - Intermédiaire', 'Node.js', 'Service client : Résolution de problèmes et dépannage', 'Découvrir SQL'],
      'experience-title': 'Expérience',
      'experience-1-title': 'Leiaute Propaganda',
      'experience-1-role': 'Développeuse de logiciels',
      'experience-1-description': 'Participation au développement de logiciels, contribuant à des solutions Front-End et Back-End, ainsi qu\'au support de l\'automatisation des processus et des chatbots.',
      'experience-1-technologies': 'Technologies et outils :',
      'experience-1-tech-list': ['Python', 'JavaScript', 'SQL', 'Selenium', 'TypeScript', 'Intelligence artificielle', 'Zapier', 'Wordpress', 'Git Version Control'],
      'experience-2-title': 'INFINITY SCHOOL - Visual Art Creative Center',
      'experience-2-role': 'Tutrice',
      'experience-2-description': 'Soutien aux étudiants dans les contenus de programação Full Stack, aide à la résolution de problèmes et orientation dans des projets pratiques.',
      'college-text': 'Je suis étudiante en <strong>Analyse et Développement de Systèmes</strong> à <strong>UniFavip Wyden</strong>, dédiée à améliorer continuellement mes connaissances dans le domaine de la tecnologia. En plus des études académiques, je recherche des cours intensifs de programmation pour rester à jour.',
      'degree-title': 'LICENCE',
      'degree-name': 'Analyse et Développement de Sistemas',
      'degree-institution': 'UniFavip Wyden',
      'degree-period': 'Mars 2023 - Novembre 2025',
      'courses-title': 'COURS INTENSIFS',
      'courses-description': 'Programmation Full Stack à <strong>INFINITY SCHOOL</strong> (Août 2023 - Février 2024).',
      'courses-additional': 'Cours et formations complémentaires pour élargir mes connaissances dans divers domaines de l\'informatique.',
      'contact-title': 'Contact',
      'contact-phone': 'Téléphone :',
      'contact-email': 'Email :',
      'contact-linkedin': 'LinkedIn :',
      'contact-github': 'GitHub :',
      'contact-portfolio': 'Portfolio :',
      'footer-text': '&copy; 2025 - Développé par Ingride Souza',
      'nav-skills': 'Compétences',
      'nav-experience': 'Expérience',
      'nav-college': 'Éducation',
      'nav-contact': 'Contact',
      'skill-1': 'Python',
      'skill-2': 'Développement Web',
      'skill-3': 'Cloud Computing',
      'skill-4': 'Java',
      'skill-5': 'Base de Données',
      'skill-6': 'Réseaux',
      'skill-7': 'Python',
      'skill-8': 'JavaScript',
      'skill-9': 'HTML',
      'skill-10': 'CSS',
      'skill-11': 'Node.js',
      'skill-12': 'React'
    }
  };

//------------------Seletor de Idiomas Avançado
document.addEventListener('DOMContentLoaded', function() {
  const dropdown = document.querySelector('.language-dropdown');
  const currentLang = document.querySelector('.language-current');
  const langOptions = document.querySelectorAll('.language-options button');
  
  // Mapeamento de ícones para cada idioma
  const langIcons = {
    'pt-BR': 'fa-globe-americas',
    'pt-PT': 'fa-globe-europe',
    'en': 'fa-globe',
    'fr': 'fa-globe'
  };
  
  // Mapeamento de nomes curtos para exibição
  const langShortNames = {
    'pt-BR': 'PT-BR',
    'pt-PT': 'PT-PT',
    'en': 'EN',
    'fr': 'FR'
  };
  
  // Ativar/desativar dropdown
  currentLang.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdown.classList.toggle('active');
    
    // Efeito visual ao abrir
    if (dropdown.classList.contains('active')) {
      animateOptions();
    }
  });
  
  // Fechar ao clicar fora
  document.addEventListener('click', function() {
    dropdown.classList.remove('active');
  });
  
  // Fechar ao pressionar Esc
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      dropdown.classList.remove('active');
    }
  });
  
  // Animar opções ao abrir
  function animateOptions() {
    langOptions.forEach((option, index) => {
      option.style.opacity = '0';
      option.style.transform = 'translateY(-10px)';
      
      setTimeout(() => {
        option.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
        option.style.opacity = '1';
        option.style.transform = 'translateY(0)';
      }, 10);
    });
  }
  
  // Atualizar idioma atual no seletor
  function updateCurrentLanguage(lang) {
    const icon = currentLang.querySelector('i:first-child');
    const text = currentLang.querySelector('span');
    
    // Atualiza ícone e texto
    icon.className = `fas ${langIcons[lang]}`;
    text.textContent = langShortNames[lang];
    
    // Adiciona efeito visual de confirmação
    currentLang.classList.add('language-changed');
    setTimeout(() => {
      currentLang.classList.remove('language-changed');
    }, 1000);
  }
  
  // Configurar eventos para cada opção de idioma
  langOptions.forEach(option => {
    option.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = this.getAttribute('data-lang');
      
      // Efeito visual ao selecionar
      this.classList.add('selected');
      setTimeout(() => {
        this.classList.remove('selected');
      }, 300);
      
      // Fechar dropdown
      dropdown.classList.remove('active');
      
      // Atualizar visual do seletor
      updateCurrentLanguage(lang);
      changeLanguage(lang);
    });
  });
  
  // Inicializar com o idioma padrão (pt-BR)
  updateCurrentLanguage('pt-BR');
});

//------------------Função de Mudança de Idioma
function changeLanguage(language) {
  const translation = translations[language];

  // Atualiza todos os textos conforme sua implementação existente
  document.getElementById('hero-title').textContent = translation['hero-title'];
  document.getElementById('hero-location').textContent = translation['hero-location'];
  // ... (keep all your existing changeLanguage() code exactly as it is)
  
  // Atualiza listas
  updateList('soft-skills-list', translation['soft-skills-list']);
  updateList('hard-skills-list', translation['hard-skills-list']);
  updateList('competencies-list', translation['competencies-list']);
  updateList('tools-list', translation['tools-list']);
  updateList('certifications-list', translation['certifications-list']);
  updateList('experience-1-tech-list', translation['experience-1-tech-list']);
}

function updateList(elementId, items) {
  const listElement = document.getElementById(elementId);
  listElement.innerHTML = ''; 
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    listElement.appendChild(li);
  });
}

//------------------Menu Hamburguer
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('mobile-menu');
  const nav = document.querySelector('nav');
  const languageSelector = document.querySelector('.language-selector');
  
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    nav.classList.toggle('active');
    languageSelector.classList.toggle('active');
    
    const icon = this.querySelector('i');
    if (nav.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
      document.body.classList.add('menu-open');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
      document.body.classList.remove('menu-open');
    }
  });
  
  // Fechar menu ao clicar em links
  document.querySelectorAll('nav a').forEach(item => {
    item.addEventListener('click', () => {
      nav.classList.remove('active');
      languageSelector.classList.remove('active');
      menuToggle.querySelector('i').classList.remove('fa-times');
      menuToggle.querySelector('i').classList.add('fa-bars');
      document.body.classList.remove('menu-open');
    });
  });
  
  // Fechar menu ao clicar fora
  document.addEventListener('click', function(e) {
    if (!nav.contains(e.target) && e.target !== menuToggle) {
      nav.classList.remove('active');
      languageSelector.classList.remove('active');
      menuToggle.querySelector('i').classList.remove('fa-times');
      menuToggle.querySelector('i').classList.add('fa-bars');
      document.body.classList.remove('menu-open');
    }
  });
});

//------------------Efeito de Digitação
document.addEventListener("DOMContentLoaded", function() {
  const heroTitle = document.getElementById('hero-title');
  const text = heroTitle.textContent || "Full Stack Developer";
  
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  
  if (isMobile) {
    heroTitle.textContent = text;
    heroTitle.classList.add('completed');
  } else {
    heroTitle.classList.add('typing-effect');
    heroTitle.textContent = ''; 
    let index = 0;
  
    function typeWriter() {
      if (index < text.length) {
        heroTitle.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100); 
      } else {
        heroTitle.style.borderRight = 'none';
      }
    }
  
    typeWriter();
  }
});

//------------------Animação de Partículas
document.addEventListener("DOMContentLoaded", function() {
  const particlesContainer = document.querySelector('.photo-particles');
  const particleCount = 30;
  const techSymbols = ['</>', '{}', '()', '[]', ';', '=>', '++', '==', '${}', '#', '*', '&&', '||', '?', ':', 'import', 'function', 'return', 'const', 'let'];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const symbol = techSymbols[Math.floor(Math.random() * techSymbols.length)];
    particle.textContent = symbol;
    
    const startAngle = Math.random() * Math.PI * 2;
    const radius = 120 + Math.random() * 80;
    const startX = Math.cos(startAngle) * radius;
    const startY = Math.sin(startAngle) * radius;
    
    particle.style.left = `calc(50% + ${startX}px)`;
    particle.style.top = `calc(50% + ${startY}px)`;
    
    const duration = 4 + Math.random() * 6;
    const delay = Math.random() * 10;
    
    particle.style.animation = `particle-fade ${duration}s ease-in-out ${delay}s infinite`;
    particle.style.transform = `scale(${0.7 + Math.random() * 0.6})`;
    
    particlesContainer.appendChild(particle);
  }
  
  // Animação do círculo tecnológico
  const techCircle = document.querySelector('.tech-circle');
  let rotation = 0;
  
  function animateCircle() {
    rotation += 0.2;
    techCircle.style.transform = `rotate(${rotation}deg)`;
    requestAnimationFrame(animateCircle);
  }
  
  animateCircle();
});

//------------------Botão Voltar ao Topo
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('back-to-top');
  const secondSection = document.querySelector('#skills');
  
  window.addEventListener('scroll', function() {
    const secondSectionPosition = secondSection.getBoundingClientRect().top;
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    if (secondSectionPosition < window.innerHeight / 2 || scrollPosition > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  backToTopButton.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });
});

//------------------Inicialização AOS
AOS.init({
  duration: 800,
  once: true,
  disable: function() {
    return window.innerWidth < 768;
  }
});

//------------------Efeito de Ripple
document.addEventListener('click', function(e) {
  if (e.target.closest('.language-options button')) {
    const button = e.target.closest('.language-options button');
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size/2;
    const y = e.clientY - rect.top - size/2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
});

//------------ terminal

// Terminal de Projetos Interativo
document.addEventListener('DOMContentLoaded', function() {
  const terminalOutput = document.getElementById('projects-output');
  const terminalCommand = document.getElementById('projects-command');
  
  // Projetos em destaque
  const projects = {
    watchtower: {
      title: "WatchTower-AI",
      description:
        "Sistema de monitoramento por vídeo com IA para detecção/análise de eventos em tempo real. Arquitetura modular e escalável.",
      features: [
        "Monitoramento de câmeras RTSP",
        "Detecção e classificação de eventos",
        "Gestão de locais e áreas",
        "API RESTful e painel web",
        "Processamento assíncrono com Celery"
      ],
      technologies: [
        "Django", "Django REST Framework", "Celery", "Redis", "PostgreSQL",
        "MinIO", "FastAPI (inferência)", "React", "Vite", "Docker"
      ],
      links: [
        { text: "Código", url: "https://github.com/ingridesouza/WatchTower-AI", icon: "fa-code" }
      ],
      year: "2025",
      badge: "ai-badge"
    },
    imagine: {
      title: "ImagAIne",
      description:
        "ImagAIne é uma plataforma de geração de imagens \"texto para imagem\", feita em Django e baseada em multiagentes de IA. O sistema gera, aprimora e valida imagens de forma autônoma, garantindo resultados de alta qualidade.",
      features: [
        "Geração de imagens por prompt",
        "Compartilhamento e galeria pública",
        "Busca por palavras-chave/similaridade",
        "Processamento assíncrono (Celery/Redis)",
        "Execução em contêineres (Docker)"
      ],
      technologies: [
        "Django", "Django REST Framework", "Celery", "Redis",
        "Hugging Face Diffusers", "PostgreSQL", "React (frontend planejado)",
        "Redux", "Material UI", "Axios", "Docker", "Docker Compose"
      ],
      links: [
        { text: "Código", url: "https://github.com/ingridesouza/ImagAIne", icon: "fa-code" }
      ],
      year: "2025",
      badge: "ai-badge"
    },
    cryptotracker: {
      title: "Crypto Tracker",
      description: "Plataforma completa para acompanhamento de criptomoedas em tempo real com agente especializado em investimentos. Consome API do CoinGecko para fornecer dados atualizados e insights inteligentes.",
      features: [
        "Cotação em tempo real de criptomoedas",
        "Conversor de valores entre moedas",
        "Chatbot especialista em criptomoedas",
        "Sistema de notificações para compra/venda",
        "Análise histórica e gráficos interativos",
        "Perfis detalhados de cada criptoativo"
      ],
      technologies: ["Python", "Flask", "HTML5", "CSS3", "JavaScript", "CoinGecko API", "DeepSeek AI"],
      links: [
        { text: "Demo", url: "#", icon: "fa-eye" },
        { text: "Código", url: "https://github.com/ingridesouza/conversor-criptomoedas", icon: "fa-code" },
        { text: "Case Study", url: "#", icon: "fa-file-alt" }
      ],
      year: "2025",
      badge: "crypto-badge"
    },
    biblioteca: {
      title: "Sistema de Gestão de Biblioteca",
      description: "Sistema completo para gerenciamento de bibliotecas com controle de acervo, empréstimos, membros e relatórios administrativos.",
      features: [
        "Cadastro de livros e membros",
        "Controle de empréstimos e devoluções",
        "Relatórios de circulação",
        "Sistema de multas automatizado",
        "Busca avançada com filtros",
        "Dashboard administrativo"
      ],
      technologies: ["Python", "Flask", "SQLAlchemy", "CSS", "SQLite"],
      links: [
        { text: "Demo", url: "https://biblioteca-online-jdta.onrender.com/", icon: "fa-eye" },
        { text: "Código", url: "https://github.com/ingridesouza/biblioteca_online", icon: "fa-code" }
      ],
      year: "2025"
    },
    techlanding: {
      title: "Landing Page - Byte Wave",
      description: "Página de destino moderna para empresa fictícia de soluções em software, com design responsivo e elementos interativos.",
      features: [
        "Design totalmente responsivo",
        "Animções CSS e JavaScript",
        "Formulário de contato funcional",
        "Seção de portfólio interativa",
        "Carrossel de depoimentos",
        "Otimizado para SEO"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "GSAP", "Responsive Design"],
      links: [
        { text: "Visitar", url: "#", icon: "fa-external-link-alt" },
        { text: "Código", url: "https://github.com/ingridesouza/page_tech", icon: "fa-code" }
      ],
      year: "2025"
    },
    netflixclone: {
      title: "Clone da Netflix",
      description: "Réplica da interface da Netflix com catálogo dinâmico.",
      features: [
        "Interface fiel ao original",
        "Carrossel de conteúdos",
        "Player de vídeo integrado",
        "Sistema de categorias",
        "Responsivo para todas as telas",
        "Efeitos de hover e transições"
      ],
      technologies: ["CSS Modules", "MovieDB API", "Axios", "JS"],
      links: [
        { text: "Demo", url: "https://netffllix.netlify.app/", icon: "fa-eye" },
        { text: "Código", url: "https://github.com/ingridesouza/Netflix_/tree/main/netflix", icon: "fa-code" }
      ],
      year: "2024"
    },
    pizzaria: {
      title: "Site Pizzaria Napoli",
      description: "Website completo para pizzaria com cardápio digital, sistema de pedidos e localização.",
      features: [
        "Cardápio interativo com categorias",
        "Sistema de carrinho de compras",
        "Integração com Google Maps",
        "Galeria de fotos dos produtos",
        "Formulário de reservas",
        "Design temático atraente"
      ],
      technologies: ["JavaScript", "HTML5", "CSS3", "Google Maps API", "LocalStorage"],
      links: [
        { text: "Visitar", url: "#", icon: "fa-external-link-alt" },
        { text: "Código", url: "#", icon: "fa-code" }
      ],
      year: "2023"
    }
  };

  // Comandos disponíveis
  const commands = {
    destaques: {
      description: "Lista meus principais projetos",
      execute: () => {
        let output = `<span class="info">Projetos em Destaque:</span>\n\n`;
        Object.keys(projects).forEach(project => {
          const proj = projects[project];
          output += `<span class="command">• ${proj.title}</span> <span class="project-year">${proj.year}</span> - <span class="info">detalhes ${project}</span>\n`;
        });
        return output + `<span class="info">\nDigite "detalhes [nome-projeto]" para mais informações</span>`;
      }
    },
    detalhes: {
      description: "Mostra detalhes completos de um projeto",
      execute: (project) => {
        if (!project) return `<span class="error">Especifique um projeto. Ex: detalhes cryptotracker</span>`;
        if (!projects[project]) return `<span class="error">Projeto não encontrado. Digite "destaques" para ver opções.</span>`;
        
        const proj = projects[project];
        return `
          <div class="project-card">
            <div class="project-title">
              ${proj.title}
              <span class="project-year ${proj.badge || ''}">${proj.year}</span>
            </div>
            <div class="project-description">${proj.description}</div>
            
            <div class="feature-list">
              <span class="info">Principais funcionalidades:</span>
              <ul>
                ${proj.features.map(feat => `<li>${feat}</li>`).join('')}
              </ul>
            </div>
            
            <div class="project-tech">
              ${proj.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            
            <div class="project-links">
              ${proj.links.map(link => `
                <a href="${link.url}" class="project-link" target="_blank">
                  <i class="fas ${link.icon}"></i> ${link.text}
                </a>
              `).join('')}
            </div>
          </div>
        `;
      }
    },
    tecnologias: {
      description: "Filtra projetos por tecnologia utilizada",
      execute: (tech) => {
        if (!tech) {
          const allTech = new Set();
          Object.values(projects).forEach(project => {
            project.technologies.forEach(t => allTech.add(t));
          });
          
          return `<span class="info">Tecnologias utilizadas:</span>\n\n` +
                 Array.from(allTech).map(t => `<span class="tech-tag">${t}</span>`).join(' ') +
                 `<span class="info">\n\nDigite "tecnologias [nome-tecnologia]" para filtrar projetos</span>`;
        }
        
        const filteredProjects = Object.entries(projects)
          .filter(([_, proj]) => proj.technologies.some(t => t.toLowerCase().includes(tech.toLowerCase())))
          .map(([key, proj]) => `<span class="command">• ${proj.title}</span> - <span class="info">detalhes ${key}</span>`);
        
        if (filteredProjects.length === 0) {
          return `<span class="error">Nenhum projeto encontrado com a tecnologia "${tech}"</span>`;
        }
        
        return `<span class="info">Projetos usando ${tech}:</span>\n\n` +
               filteredProjects.join('\n') +
               `<span class="info">\n\nDigite "detalhes [nome-projeto]" para mais informações</span>`;
      }
    },
    help: {
      description: "Mostra todos os comandos disponíveis",
      execute: () => {
        let helpText = `<span class="info">Comandos do Terminal de Projetos:</span>\n\n`;
        Object.keys(commands).forEach(cmd => {
          helpText += `<span class="command">${cmd}</span> - ${commands[cmd].description}\n`;
        });
        return helpText + `<span class="info">\nExperimente começar com "destaques"</span>`;
      }
    },
    clear: {
      description: "Limpa o terminal",
      execute: () => {
        terminalOutput.innerHTML = '';
        return '';
      }
    }
  };

  // Processa os comandos
  function processCommand(fullCmd) {
    const parts = fullCmd.split(' ');
    const baseCmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    addToTerminal(`<span class="prompt">$</span> ${fullCmd}`, 'user-input');
    
    if (commands[baseCmd]) {
      const output = commands[baseCmd].execute(...args);
      if (output) addToTerminal(output);
    } else {
      addToTerminal(`<span class="error">Comando não encontrado: ${baseCmd}</span>\n` +
                   `<span class="info">Digite 'help' para ver os comandos disponíveis</span>`);
    }
    
    terminalCommand.value = '';
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  // Adiciona texto ao terminal
  function addToTerminal(text, className = '') {
    const line = document.createElement('div');
    line.className = `terminal-output-line ${className}`;
    line.innerHTML = text;
    terminalOutput.appendChild(line);
  }

  // Inicializa o terminal
  function initTerminal() {
    addToTerminal(
      `<span class="info">Terminal de Projetos - Ingride Souza</span>\n` +
      `<span class="response">Desenvolvedora Full Stack | Especialista em Python e Soluções Inovadoras</span>\n\n` +
      `<span class="info">Digite 'destaques' para ver meus projetos ou 'help' para ajuda</span>\n\n` +
      `<span class="prompt">$</span> <span class="blink">_</span>`
    );
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  // Event listeners
  terminalCommand.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const cmd = terminalCommand.value.trim();
      if (cmd) processCommand(cmd);
    }
  });

  // terminalCommand.focus();
  
  initTerminal();

  // Efeito de cursor piscante
  setInterval(() => {
    const blink = document.querySelector('.blink');
    if (blink) blink.style.visibility = blink.style.visibility === 'hidden' ? 'visible' : 'hidden';
  }, 500);
});

