document.addEventListener("DOMContentLoaded", function() {
  // AOS
  AOS.init({
    duration: 1000,
    once: true,
  });

  const heroTitle = document.getElementById('hero-title');
  heroTitle.classList.add('typing-effect');
  
  const text = "Full Stack Developer"; // Texto fixo para o efeito
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
      'hero-title': 'Desenvolvedora Full Stack',
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
      'hero-title': 'Desenvolvedora Full Stack',
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
      'hero-title': 'Full Stack Developer',
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
      'hero-title': 'Développeuse Full Stack',
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

  function changeLanguage(language) {
    const translation = translations[language];

    document.getElementById('hero-title').textContent = translation['hero-title'];
    document.getElementById('hero-location').textContent = translation['hero-location'];
    document.getElementById('about-text').textContent = translation['about-text'];
    document.getElementById('skills-title').textContent = translation['skills-title'];
    document.getElementById('soft-skills-title').textContent = translation['soft-skills-title'];
    document.getElementById('hard-skills-title').textContent = translation['hard-skills-title'];
    document.getElementById('competencies-title').textContent = translation['competencies-title'];
    document.getElementById('tools-title').textContent = translation['tools-title'];
    document.getElementById('certifications-title').textContent = translation['certifications-title'];
    document.getElementById('experience-title').textContent = translation['experience-title'];
    document.getElementById('experience-1-title').textContent = translation['experience-1-title'];
    document.getElementById('experience-1-role').textContent = translation['experience-1-role'];
    document.getElementById('experience-1-description').textContent = translation['experience-1-description'];
    document.getElementById('experience-1-technologies').textContent = translation['experience-1-technologies'];
    document.getElementById('experience-2-title').textContent = translation['experience-2-title'];
    document.getElementById('experience-2-role').textContent = translation['experience-2-role'];
    document.getElementById('experience-2-description').textContent = translation['experience-2-description'];
    document.getElementById('college-text').innerHTML = translation['college-text'];
    document.getElementById('degree-title').textContent = translation['degree-title'];
    document.getElementById('degree-name').textContent = translation['degree-name'];
    document.getElementById('degree-institution').textContent = translation['degree-institution'];
    document.getElementById('degree-period').textContent = translation['degree-period'];
    document.getElementById('courses-title').textContent = translation['courses-title'];
    document.getElementById('courses-description').innerHTML = translation['courses-description'];
    document.getElementById('courses-additional').textContent = translation['courses-additional'];
    document.getElementById('contact-title').textContent = translation['contact-title'];
    document.getElementById('contact-phone').textContent = translation['contact-phone'];
    document.getElementById('contact-email').textContent = translation['contact-email'];
    document.getElementById('contact-linkedin').textContent = translation['contact-linkedin'];
    document.getElementById('contact-github').textContent = translation['contact-github'];
    document.getElementById('contact-portfolio').textContent = translation['contact-portfolio'];
    document.getElementById('footer-text').innerHTML = translation['footer-text'];

    // nav
    document.getElementById('nav-skills').textContent = translation['nav-skills'];
    document.getElementById('nav-experience').textContent = translation['nav-experience'];
    document.getElementById('nav-college').textContent = translation['nav-college'];
    document.getElementById('nav-contact').textContent = translation['nav-contact'];

    // caixinhas de habilidades
    for (let i = 1; i <= 12; i++) {
      const skillElement = document.getElementById(`skill-${i}`);
      if (skillElement) {
        skillElement.textContent = translation[`skill-${i}`];
      }
    }

    // listas
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
// Menu Hamburguer melhorado
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('mobile-menu');
  const nav = document.querySelector('nav');
  const languageSelector = document.querySelector('.language-selector');
  
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation(); // Evita que o clique propague para o documento
    nav.classList.toggle('active');
    languageSelector.classList.toggle('active');
    
    const icon = this.querySelector('i');
    if (nav.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
      // Adiciona overlay quando o menu está aberto
      document.body.classList.add('menu-open');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
      // Remove overlay quando o menu está fechado
      document.body.classList.remove('menu-open');
    }
  });
  
  // Fechar menu ao clicar em qualquer link
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

// Ajuste no efeito de digitação para mobile
document.addEventListener("DOMContentLoaded", function() {
  const heroTitle = document.getElementById('hero-title');
  const text = heroTitle.textContent || "Full Stack Developer";
  
  // Verifica se é mobile
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  
  if (isMobile) {
    // Em mobile, mostra o texto completo sem animação
    heroTitle.textContent = text;
    heroTitle.classList.add('completed');
  } else {
    // Em desktop, mantém a animação de digitação
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

// AOS ajustado para mobile
AOS.init({
  duration: 800, // Duração menor para mobile
  once: true,
  disable: function() {
    return window.innerWidth < 768; // Desativa animações em mobile
  }
});

// Ativa animações simples quando o menu é fechado
document.querySelectorAll('nav a').forEach(item => {
  item.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      setTimeout(() => {
        window.scrollBy(0, 1); // Força um redraw para suavizar a transição
      }, 300);
    }
  });
});

// Voltar para o topo

document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('back-to-top');
  const secondSection = document.querySelector('#skills'); // Segunda seção do site
  
  // Mostrar/ocultar o botão baseado na posição da segunda seção
  window.addEventListener('scroll', function() {
    const secondSectionPosition = secondSection.getBoundingClientRect().top;
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Mostrar quando o topo da segunda seção estiver acima do meio da tela
    if (secondSectionPosition < window.innerHeight / 2 || scrollPosition > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  // Rolagem suave quando o botão é clicado
  backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Adiciona acessibilidade via teclado
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

// Particulas
document.addEventListener("DOMContentLoaded", function() {
  const particlesContainer = document.querySelector('.photo-particles');
  const particleCount = 30; // Aumentei o número de partículas
  const techSymbols = ['</>', '{}', '()', '[]', ';', '=>', '++', '==', '${}', '#', '*', '&&', '||', '?', ':', 'import', 'function', 'return', 'const', 'let'];
  
  // Cria partículas estilo código
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Símbolo aleatório
    const symbol = techSymbols[Math.floor(Math.random() * techSymbols.length)];
    particle.textContent = symbol;
    
    // Posição inicial aleatória
    const startAngle = Math.random() * Math.PI * 2;
    const radius = 120 + Math.random() * 80;
    const startX = Math.cos(startAngle) * radius;
    const startY = Math.sin(startAngle) * radius;
    
    particle.style.left = `calc(50% + ${startX}px)`;
    particle.style.top = `calc(50% + ${startY}px)`;
    
    // Animação única para cada partícula
    const duration = 4 + Math.random() * 6;
    const delay = Math.random() * 10;
    
    particle.style.animation = `particle-fade ${duration}s ease-in-out ${delay}s infinite`;
    
    // Efeito de profundidade
    particle.style.transform = `scale(${0.7 + Math.random() * 0.6})`;
    
    particlesContainer.appendChild(particle);
  }
  
  // Efeito de círculo tecnológico dinâmico
  const techCircle = document.querySelector('.tech-circle');
  let rotation = 0;
  
  function animateCircle() {
    rotation += 0.2;
    techCircle.style.transform = `rotate(${rotation}deg)`;
    requestAnimationFrame(animateCircle);
  }
  
  animateCircle();
});