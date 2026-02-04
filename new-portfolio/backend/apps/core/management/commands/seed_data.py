from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.profile.models import Profile, SocialLink
from apps.skills.models import SkillCategory, Skill
from apps.projects.models import Project, ProjectFeature, ProjectLink
from apps.experience.models import Experience
from apps.education.models import Education, Certification
from datetime import date

User = get_user_model()


class Command(BaseCommand):
    help = 'Seed database with initial portfolio data for Ingride Souza'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...')

        self.create_superuser()
        self.create_profile()
        self.create_skills()
        self.create_projects()
        self.create_experience()
        self.create_education()

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))

    def create_superuser(self):
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin',
                email='admin@ingridesouza.dev',
                password='admin123'
            )
            self.stdout.write(self.style.SUCCESS('Superuser created'))
        else:
            self.stdout.write('Superuser already exists')

    def create_profile(self):
        profile, created = Profile.objects.update_or_create(
            defaults={
                'full_name': 'Ingride Souza',
                'professional_title': 'Full Stack Developer | Foco em Back-End | Python | IA Aplicada',
                'professional_title_en': 'Full Stack Developer | Backend-focused | Python | Applied AI',
                'professional_title_fr': 'Developpeuse Full Stack | Focus Back-End | Python | IA Appliquee',
                'location': 'Salvador, Bahia, Brasil',
                'email': 'ingridesouza040@gmail.com',
                'phone': '71981170909',
                'bio_short': 'Desenvolvedora Full Stack com foco em Back-End, Python, APIs, automacao e IA aplicada. Construo sistemas praticos, manteniveis e alinhados com restricoes reais.',
                'bio_short_en': 'Full Stack Developer with a strong focus on backend engineering, Python, APIs, automation and applied AI. I build practical, maintainable systems aligned with real constraints.',
                'bio_short_fr': 'Developpeuse Full Stack avec un fort focus sur le back-end, Python, APIs, automatisation et IA appliquee. Je construis des systemes pratiques et maintenables.',
                'bio_full': '''Desenvolvedora Full Stack com foco em engenharia backend e sistemas baseados em Python.

Trabalho principalmente com APIs, processamento de dados, automacao e recursos orientados por IA, projetando sistemas que sao praticos, manteniveis e alinhados com restricoes reais. Me importo menos com tendencias e mais com se uma solucao realmente funciona sob carga, com dados imperfeitos e requisitos em evolucao.

Uso IA extensivamente nos meus projetos - tanto como parte do produto (NLP, visao computacional, embeddings) quanto como copiloto de desenvolvimento, acelerando raciocinio, prototipagem e iteracao.

Stack principal: Python (especialista), Django, Flask, REST APIs, PostgreSQL, Redis, Celery, RabbitMQ, Docker, NLP, Computer Vision, n8n, JavaScript/TypeScript.

Comeco pelo problema e restricoes, nao pela stack. Prefiro fluxo de dados claro a abstracoes inteligentes. Automacao vem antes de dashboards. Se IA nao melhora o resultado, nao a forco. Codigo deve ser legivel, testavel e sobreviver a outro desenvolvedor.''',
                'bio_full_en': '''Full Stack Developer with a strong focus on backend engineering and Python-based systems.

I work mainly with APIs, data processing, automation and AI-driven features, designing systems that are practical, maintainable and aligned with real constraints. I care less about trends and more about whether a solution actually works under load, with imperfect data and evolving requirements.

I use AI extensively in my projects - both as part of the product (NLP, computer vision, embeddings) and as a development copilot, accelerating reasoning, prototyping and iteration.

Core stack: Python (specialist), Django, Flask, REST APIs, PostgreSQL, Redis, Celery, RabbitMQ, Docker, NLP, Computer Vision, n8n, JavaScript/TypeScript.

I start from the problem and constraints, not the stack. I prefer clear data flow over clever abstractions. Automation comes before dashboards. If AI doesn't improve the outcome, I don't force it. Code should be readable, testable and survivable by another developer.''',
                'bio_full_fr': '''Developpeuse Full Stack avec un fort focus sur l'ingenierie backend et les systemes bases sur Python.

Je travaille principalement avec les APIs, le traitement de donnees, l'automatisation et les fonctionnalites orientees IA, concevant des systemes pratiques, maintenables et alignes avec les contraintes reelles.

J'utilise l'IA de maniere extensive dans mes projets - a la fois comme partie du produit (NLP, vision par ordinateur, embeddings) et comme copilote de developpement.

Stack principal: Python (specialiste), Django, Flask, REST APIs, PostgreSQL, Redis, Celery, RabbitMQ, Docker, NLP, Vision par Ordinateur, n8n, JavaScript/TypeScript.

Je commence par le probleme et les contraintes, pas par la stack. Le code doit etre lisible, testable et survivre a un autre developpeur.''',
                'github_username': 'ingridesouza',
                'is_available_for_hire': True,
            }
        )

        if created:
            self.stdout.write(self.style.SUCCESS('Profile created'))
        else:
            self.stdout.write('Profile updated')

        # Social links
        social_links = [
            {'platform': 'github', 'url': 'https://github.com/ingridesouza', 'icon_class': 'github'},
            {'platform': 'linkedin', 'url': 'https://www.linkedin.com/in/ingride-souza-a21a4518a/', 'icon_class': 'linkedin'},
            {'platform': 'email', 'url': 'mailto:ingridesouza040@gmail.com', 'icon_class': 'mail'},
            {'platform': 'instagram', 'url': 'https://instagram.com/ingridesouzadev', 'icon_class': 'instagram'},
        ]

        for link_data in social_links:
            SocialLink.objects.update_or_create(
                profile=profile,
                platform=link_data['platform'],
                defaults=link_data
            )

        self.stdout.write(self.style.SUCCESS('Social links created'))

    def create_skills(self):
        categories_data = [
            {
                'name': 'Back-End',
                'name_en': 'Back-End',
                'name_fr': 'Back-End',
                'icon_class': 'server',
                'order': 1,
                'skills': [
                    {'name': 'Python', 'proficiency': 90, 'icon_class': 'python', 'color': '#3776AB', 'is_featured': True, 'years_experience': 3},
                    {'name': 'Django', 'proficiency': 85, 'icon_class': 'django', 'color': '#092E20', 'is_featured': True, 'years_experience': 2},
                    {'name': 'Flask', 'proficiency': 80, 'icon_class': 'flask', 'color': '#000000', 'is_featured': True, 'years_experience': 2},
                    {'name': 'Django REST Framework', 'proficiency': 85, 'icon_class': 'api', 'color': '#A30000', 'is_featured': True, 'years_experience': 2},
                    {'name': 'PostgreSQL', 'proficiency': 80, 'icon_class': 'postgresql', 'color': '#336791', 'is_featured': True, 'years_experience': 2},
                    {'name': 'SQLAlchemy', 'proficiency': 75, 'icon_class': 'database', 'color': '#CA0C00', 'is_featured': False, 'years_experience': 2},
                    {'name': 'Redis', 'proficiency': 70, 'icon_class': 'redis', 'color': '#DC382D', 'is_featured': False, 'years_experience': 1},
                    {'name': 'Celery', 'proficiency': 70, 'icon_class': 'tasks', 'color': '#37814A', 'is_featured': False, 'years_experience': 1},
                    {'name': 'RabbitMQ', 'proficiency': 65, 'icon_class': 'rabbitmq', 'color': '#FF6600', 'is_featured': False, 'years_experience': 1},
                ]
            },
            {
                'name': 'IA & Machine Learning',
                'name_en': 'AI & Machine Learning',
                'name_fr': 'IA & Machine Learning',
                'icon_class': 'brain',
                'order': 2,
                'skills': [
                    {'name': 'NLP (BERT, ALBERT, RoBERTa)', 'proficiency': 75, 'icon_class': 'brain', 'color': '#FF6B6B', 'is_featured': True, 'years_experience': 1},
                    {'name': 'Computer Vision (YOLOv5)', 'proficiency': 70, 'icon_class': 'eye', 'color': '#4ECDC4', 'is_featured': True, 'years_experience': 1},
                    {'name': 'Hugging Face', 'proficiency': 70, 'icon_class': 'huggingface', 'color': '#FFD21E', 'is_featured': True, 'years_experience': 1},
                    {'name': 'KeyBERT', 'proficiency': 70, 'icon_class': 'key', 'color': '#6C5CE7', 'is_featured': False, 'years_experience': 1},
                    {'name': 'Web Scraping', 'proficiency': 80, 'icon_class': 'spider', 'color': '#00B894', 'is_featured': False, 'years_experience': 2},
                ]
            },
            {
                'name': 'Front-End',
                'name_en': 'Front-End',
                'name_fr': 'Front-End',
                'icon_class': 'layout',
                'order': 3,
                'skills': [
                    {'name': 'JavaScript', 'proficiency': 70, 'icon_class': 'javascript', 'color': '#F7DF1E', 'is_featured': True, 'years_experience': 2},
                    {'name': 'TypeScript', 'proficiency': 65, 'icon_class': 'typescript', 'color': '#3178C6', 'is_featured': True, 'years_experience': 1},
                    {'name': 'React', 'proficiency': 65, 'icon_class': 'react', 'color': '#61DAFB', 'is_featured': True, 'years_experience': 1},
                    {'name': 'React Native', 'proficiency': 55, 'icon_class': 'react', 'color': '#61DAFB', 'is_featured': False, 'years_experience': 1},
                    {'name': 'HTML5', 'proficiency': 85, 'icon_class': 'html5', 'color': '#E34F26', 'is_featured': False, 'years_experience': 3},
                    {'name': 'CSS3', 'proficiency': 80, 'icon_class': 'css3', 'color': '#1572B6', 'is_featured': False, 'years_experience': 3},
                    {'name': 'Bootstrap', 'proficiency': 80, 'icon_class': 'bootstrap', 'color': '#7952B3', 'is_featured': False, 'years_experience': 2},
                ]
            },
            {
                'name': 'DevOps & Ferramentas',
                'name_en': 'DevOps & Tools',
                'name_fr': 'DevOps & Outils',
                'icon_class': 'terminal',
                'order': 4,
                'skills': [
                    {'name': 'Git', 'proficiency': 85, 'icon_class': 'git', 'color': '#F05032', 'is_featured': True, 'years_experience': 3},
                    {'name': 'Docker', 'proficiency': 80, 'icon_class': 'docker', 'color': '#2496ED', 'is_featured': True, 'years_experience': 2},
                    {'name': 'Docker Compose', 'proficiency': 80, 'icon_class': 'docker', 'color': '#2496ED', 'is_featured': False, 'years_experience': 2},
                    {'name': 'n8n', 'proficiency': 75, 'icon_class': 'workflow', 'color': '#EA4B71', 'is_featured': True, 'years_experience': 1},
                    {'name': 'VS Code', 'proficiency': 90, 'icon_class': 'vscode', 'color': '#007ACC', 'is_featured': False, 'years_experience': 3},
                    {'name': 'PyCharm', 'proficiency': 85, 'icon_class': 'pycharm', 'color': '#21D789', 'is_featured': False, 'years_experience': 2},
                ]
            },
        ]

        for cat_data in categories_data:
            skills_data = cat_data.pop('skills')
            category, _ = SkillCategory.objects.update_or_create(
                name=cat_data['name'],
                defaults=cat_data
            )

            for skill_data in skills_data:
                Skill.objects.update_or_create(
                    category=category,
                    name=skill_data['name'],
                    defaults=skill_data
                )

        self.stdout.write(self.style.SUCCESS('Skills created'))

    def create_projects(self):
        # Remove old projects before creating new ones
        Project.objects.all().delete()

        python = Skill.objects.filter(name='Python').first()
        django = Skill.objects.filter(name='Django').first()
        drf = Skill.objects.filter(name='Django REST Framework').first()
        react_native = Skill.objects.filter(name='React Native').first()
        postgresql = Skill.objects.filter(name='PostgreSQL').first()
        docker = Skill.objects.filter(name='Docker').first()
        typescript = Skill.objects.filter(name='TypeScript').first()

        projects_data = [
            {
                'slug': 'nexa-app',
                'title': 'Nexa App',
                'title_en': 'Nexa App',
                'title_fr': 'Nexa App',
                'short_description': 'Aplicativo financeiro mobile focado em clareza e tomada de decisao.',
                'short_description_en': 'Financial mobile application focused on clarity and decision-making.',
                'short_description_fr': 'Application mobile financiere axee sur la clarte et la prise de decision.',
                'full_description': '''Um produto em progresso que trata financas pessoais como um problema humano, nao tecnico. A arquitetura enfatiza regras de negocio claras, dominios modulares e simplicidade para o usuario final.

Backend construido com Django + DRF, PostgreSQL, autenticacao JWT e estrutura orientada a dominio. App mobile desenvolvido com React Native e TypeScript. Infraestrutura local gerenciada com Docker Compose, preparada para cargas assincronas e escalabilidade futura.''',
                'full_description_en': '''An in-progress product that treats personal finance as a human problem rather than a technical one. The architecture emphasizes clear business rules, modular domains and simplicity for the end user.

Backend built with Django + DRF, PostgreSQL, JWT authentication and a domain-oriented structure. Mobile app developed with React Native and TypeScript. Local infrastructure managed with Docker Compose, prepared for async workloads and future scaling.''',
                'full_description_fr': '''Un produit en cours qui traite les finances personnelles comme un probleme humain plutot que technique. L\'architecture met l\'accent sur des regles metier claires et des domaines modulaires.

Backend construit avec Django + DRF, PostgreSQL, authentification JWT. App mobile developpee avec React Native et TypeScript.''',
                'year': 2025,
                'is_featured': True,
                'github_repo': 'https://github.com/ingridesouza/nexa-app',
                'technologies': [python, django, drf, postgresql, docker, react_native, typescript],
                'features': [
                    'Arquitetura orientada a dominio',
                    'Autenticacao JWT',
                    'App mobile com React Native',
                    'Backend Django REST Framework',
                    'Preparado para cargas assincronas',
                    'Docker Compose para desenvolvimento',
                ]
            },
        ]

        for proj_data in projects_data:
            technologies = proj_data.pop('technologies', [])
            features_data = proj_data.pop('features', [])

            project, _ = Project.objects.update_or_create(
                slug=proj_data['slug'],
                defaults=proj_data
            )

            # Clear and add technologies
            project.technologies.clear()
            for tech in technologies:
                if tech:
                    project.technologies.add(tech)

            # Clear and add features
            project.features.all().delete()
            for i, feature_text in enumerate(features_data):
                ProjectFeature.objects.create(
                    project=project,
                    description=feature_text,
                    order=i
                )

            # Add links
            ProjectLink.objects.filter(project=project).delete()
            if proj_data.get('github_repo'):
                ProjectLink.objects.create(
                    project=project,
                    type='code',
                    url=proj_data['github_repo']
                )
            if proj_data.get('live_url'):
                ProjectLink.objects.create(
                    project=project,
                    type='demo',
                    url=proj_data['live_url']
                )

        self.stdout.write(self.style.SUCCESS('Projects created'))

    def create_experience(self):
        # Remove old experiences before creating new ones
        Experience.objects.all().delete()

        python = Skill.objects.filter(name='Python').first()
        django = Skill.objects.filter(name='Django').first()
        flask = Skill.objects.filter(name='Flask').first()
        drf = Skill.objects.filter(name='Django REST Framework').first()
        postgresql = Skill.objects.filter(name='PostgreSQL').first()
        git = Skill.objects.filter(name='Git').first()
        docker = Skill.objects.filter(name='Docker').first()
        react = Skill.objects.filter(name='React').first()
        yolo = Skill.objects.filter(name='Computer Vision (YOLOv5)').first()
        nlp = Skill.objects.filter(name='NLP (BERT, ALBERT, RoBERTa)').first()
        scraping = Skill.objects.filter(name='Web Scraping').first()
        javascript = Skill.objects.filter(name='JavaScript').first()
        html = Skill.objects.filter(name='HTML5').first()
        css = Skill.objects.filter(name='CSS3').first()

        experiences_data = [
            {
                'company_name': 'Athom8',
                'position': 'Desenvolvedor de Software Backend',
                'position_en': 'Backend Software Developer',
                'position_fr': 'Developpeur Logiciel Backend',
                'location': 'Salvador, Bahia, Brasil',
                'description': '''Desenvolvimento de sistemas backend com foco em Python, Django e APIs RESTful.

Implementacao de solucoes escalaveis e integracoes com servicos externos.

Trabalho com processamento assincrono e arquiteturas orientadas a eventos.''',
                'description_en': '''Backend systems development focused on Python, Django and RESTful APIs.

Implementation of scalable solutions and integrations with external services.

Work with async processing and event-driven architectures.''',
                'description_fr': '''Developpement de systemes backend axes sur Python, Django et APIs RESTful.

Implementation de solutions evolutives et integrations avec des services externes.''',
                'start_date': date(2026, 1, 1),
                'is_current': True,
                'technologies': [python, django, drf, postgresql, git, docker],
            },
            {
                'company_name': 'Leiaute Propaganda',
                'position': 'Desenvolvedor de Software',
                'position_en': 'Software Developer',
                'position_fr': 'Developpeur Logiciel',
                'location': 'Salvador, Bahia, Brasil',
                'description': '''Desenvolvi sistemas completos utilizando Django, Flask e React, criando APIs REST com autenticacao JWT e integracao de bancos de dados PostgreSQL e SQLAlchemy, garantindo eficiencia e seguranca no gerenciamento de dados.

Implementei solucoes de inteligencia artificial aplicando modelos como YOLOv5, ALBERT, BERT e RoBERTa para reconhecimento facial, analise de sentimentos e busca de imagens por descricao textual.

Realizei integracoes com plataformas externas como Apify e Meta Graph API para extracao e analise de dados publicos de redes sociais, contribuindo para a geracao de insights estrategicos.

Modelei e gerenciei bancos de dados escalaveis, aplicando boas praticas de seguranca da informacao e conformidade com legislacoes de protecao de dados.

Desenvolvi e implementei solucoes de web scraping, extraindo dados de fontes publicas de forma automatizada para enriquecer analises e processos internos.

Utilizei Docker para criacao e gerenciamento de ambientes de desenvolvimento e producao, garantindo maior padronizacao, escalabilidade e facilidade de deploy.

Desenvolvi documentacao tecnica abrangente, incluindo fluxos operacionais, logs e diretrizes de manutencao, com foco em clareza e apoio ao trabalho em equipe.

Automatizei processos internos utilizando Python, entre outras tecnologias, otimizando a produtividade e a precisao de operacoes essenciais.''',
                'description_en': '''Developed complete systems using Django, Flask and React, creating REST APIs with JWT authentication and PostgreSQL/SQLAlchemy database integration, ensuring efficiency and security in data management.

Implemented artificial intelligence solutions applying models like YOLOv5, ALBERT, BERT and RoBERTa for facial recognition, sentiment analysis and image search by text description.

Performed integrations with external platforms like Apify and Meta Graph API for extraction and analysis of public social media data, contributing to strategic insights generation.

Modeled and managed scalable databases, applying information security best practices and compliance with data protection legislation.

Developed and implemented web scraping solutions, extracting data from public sources automatically to enrich internal analyses and processes.

Used Docker for creation and management of development and production environments, ensuring greater standardization, scalability and deployment ease.

Developed comprehensive technical documentation, including operational flows, logs and maintenance guidelines, focused on clarity and team support.

Automated internal processes using Python, among other technologies, optimizing productivity and accuracy of essential operations.''',
                'description_fr': '''Developpement de systemes complets avec Django, Flask et React, creation d\'APIs REST avec authentification JWT et integration de bases de donnees PostgreSQL et SQLAlchemy.

Implementation de solutions d\'intelligence artificielle avec des modeles comme YOLOv5, ALBERT, BERT et RoBERTa.

Integrations avec des plateformes externes comme Apify et Meta Graph API.

Utilisation de Docker pour la creation et la gestion des environnements.''',
                'start_date': date(2024, 9, 1),
                'end_date': date(2026, 1, 1),
                'is_current': False,
                'technologies': [python, django, flask, drf, react, postgresql, git, docker, yolo, nlp, scraping],
            },
            {
                'company_name': 'INFINITY SCHOOL - Visual Art Creative Center',
                'position': 'Monitor de Programacao',
                'position_en': 'Programming Monitor',
                'position_fr': 'Moniteur de Programmation',
                'location': 'Salvador, Bahia, Brasil',
                'description': '''Apoio aos alunos das turmas de Programacao Full Stack nas disciplinas de Python, JavaScript, Logica de Programacao e HTML/CSS.

Ministracao de aulas introdutorias presenciais para novos alunos.

Realizacao de lives via Discord com apresentacao de slides e resolucao de exercicios.

Aplicacao de aulas de reforco e aulas de reposicao para acompanhamento dos alunos.

Correcao de provas e atividades, com feedback para desenvolvimento individual.

Suporte individualizado aos alunos para esclarecimento de duvidas e orientacao em projetos.

Colaboracao com a equipe pedagogica para melhoria continua dos metodos de ensino.''',
                'description_en': '''Support to Full Stack Programming students in Python, JavaScript, Programming Logic and HTML/CSS subjects.

Teaching introductory in-person classes for new students.

Conducting live sessions via Discord with slide presentations and exercise solving.

Providing reinforcement and make-up classes for student follow-up.

Grading exams and activities, with feedback for individual development.

Individual support to students for doubt clarification and project guidance.

Collaboration with pedagogical team for continuous improvement of teaching methods.''',
                'description_fr': '''Soutien aux etudiants en Programmation Full Stack dans les matieres Python, JavaScript, Logique de Programmation et HTML/CSS.

Enseignement de cours d\'introduction en presentiel pour les nouveaux etudiants.

Realisation de sessions en direct via Discord avec presentations de diapositives et resolution d\'exercices.''',
                'start_date': date(2024, 5, 1),
                'end_date': date(2024, 9, 1),
                'is_current': False,
                'technologies': [python, javascript, html, css, git],
            },
        ]

        for exp_data in experiences_data:
            technologies = exp_data.pop('technologies', [])

            experience, _ = Experience.objects.update_or_create(
                company_name=exp_data['company_name'],
                position=exp_data['position'],
                defaults=exp_data
            )

            experience.technologies.clear()
            for tech in technologies:
                if tech:
                    experience.technologies.add(tech)

        self.stdout.write(self.style.SUCCESS('Experiences created'))

    def create_education(self):
        # Remove old education and certifications before creating new ones
        Education.objects.all().delete()
        Certification.objects.all().delete()

        python = Skill.objects.filter(name='Python').first()
        django = Skill.objects.filter(name='Django').first()
        javascript = Skill.objects.filter(name='JavaScript').first()
        html = Skill.objects.filter(name='HTML5').first()
        css = Skill.objects.filter(name='CSS3').first()

        education_data = [
            {
                'institution': 'UniFavip Wyden',
                'degree_type': 'technologist',
                'degree_name': 'Analise e Desenvolvimento de Sistemas',
                'degree_name_en': 'Systems Analysis and Development',
                'degree_name_fr': 'Analyse et Developpement de Systemes',
                'start_date': date(2023, 3, 1),
                'end_date': date(2025, 12, 1),
                'is_current': False,
                'skills_learned': [python, django, javascript],
            },
            {
                'institution': 'INFINITY SCHOOL - Visual Art Creative Center',
                'degree_type': 'course',
                'degree_name': 'Programacao Full Stack',
                'degree_name_en': 'Full Stack Programming',
                'degree_name_fr': 'Programmation Full Stack',
                'start_date': date(2023, 8, 1),
                'end_date': date(2024, 2, 1),
                'is_current': False,
                'skills_learned': [python, javascript, html, css],
            },
        ]

        for edu_data in education_data:
            skills = edu_data.pop('skills_learned', [])

            education, _ = Education.objects.update_or_create(
                institution=edu_data['institution'],
                degree_name=edu_data['degree_name'],
                defaults=edu_data
            )

            education.skills_learned.clear()
            for skill in skills:
                if skill:
                    education.skills_learned.add(skill)

        certifications_data = [
            {
                'name': 'Automacao com N8N',
                'name_en': 'Automation with N8N',
                'issuing_organization': 'DIO',
                'issue_date': date(2026, 1, 1),
            },
            {
                'name': 'Google: Inteligencia Artificial e Produtividade',
                'name_en': 'Google: Artificial Intelligence and Productivity',
                'issuing_organization': 'Santander Open Academy',
                'issue_date': date(2025, 1, 1),
            },
            {
                'name': 'LLMs e Processamento de Linguagem Natural',
                'name_en': 'LLMs and Natural Language Processing',
                'issuing_organization': 'UFBA - Universidade Federal da Bahia',
                'issue_date': date(2025, 9, 1),
            },
            {
                'name': 'Crie aplicativos em Python com ChatGPT integrado via API',
                'name_en': 'Create Python apps with ChatGPT integrated via API',
                'issuing_organization': 'Udemy',
                'issue_date': date(2024, 9, 1),
            },
            {
                'name': 'Node.js',
                'name_en': 'Node.js',
                'issuing_organization': 'INFINITY SCHOOL - Visual Art Creative Center',
                'issue_date': date(2024, 3, 1),
            },
            {
                'name': 'Desvendando SQL',
                'name_en': 'Unveiling SQL',
                'issuing_organization': 'INFINITY SCHOOL - Visual Art Creative Center',
                'issue_date': date(2023, 12, 1),
            },
            {
                'name': 'Tecnicas Avancadas de Python',
                'name_en': 'Advanced Python Techniques',
                'issuing_organization': 'LinkedIn',
                'issue_date': date(2024, 4, 1),
            },
            {
                'name': 'Programacao Full Stack',
                'name_en': 'Full Stack Programming',
                'issuing_organization': 'INFINITY SCHOOL - Visual Art Creative Center',
                'issue_date': date(2024, 4, 1),
            },
            {
                'name': 'Workshop - Criando o seu primeiro site',
                'name_en': 'Workshop - Creating your first website',
                'issuing_organization': 'INFINITY SCHOOL - Visual Art Creative Center',
                'issue_date': date(2023, 3, 1),
            },
            {
                'name': 'Customer Service: Problem-Solving and Troubleshooting',
                'name_en': 'Customer Service: Problem-Solving and Troubleshooting',
                'issuing_organization': 'LinkedIn',
                'issue_date': date(2023, 1, 1),
            },
            {
                'name': 'Microsoft Excel 2016 - Intermediario',
                'name_en': 'Microsoft Excel 2016 - Intermediate',
                'issuing_organization': 'Fundacao Bradesco',
                'issue_date': date(2022, 1, 1),
            },
        ]

        for cert_data in certifications_data:
            Certification.objects.update_or_create(
                name=cert_data['name'],
                issuing_organization=cert_data['issuing_organization'],
                defaults=cert_data
            )

        self.stdout.write(self.style.SUCCESS('Education and certifications created'))
