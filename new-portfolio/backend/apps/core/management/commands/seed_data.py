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
                'professional_title': 'Desenvolvedora Back-End',
                'professional_title_en': 'Back-End Developer',
                'professional_title_fr': 'Developpeuse Back-End',
                'location': 'Brasil',
                'email': 'contato@ingridesouza.dev',
                'bio_short': 'Desenvolvedora Back-End apaixonada por criar APIs robustas e sistemas escalaveis.',
                'bio_short_en': 'Back-End Developer passionate about creating robust APIs and scalable systems.',
                'bio_short_fr': 'Developpeuse Back-End passionnee par la creation d\'APIs robustes et de systemes evolutifs.',
                'bio_full': '''Ola! Sou a Ingride, uma desenvolvedora Back-End Junior com foco em Python e Django.

Minha jornada na programacao comecou com curiosidade e se transformou em paixao. Hoje, trabalho criando APIs RESTful, integrando sistemas e desenvolvendo solucoes que fazem a diferenca.

Estou sempre buscando aprender novas tecnologias e aprimorar minhas habilidades. Acredito que o codigo limpo e bem estruturado e a base de qualquer projeto de sucesso.

Quando nao estou codando, gosto de explorar novas ferramentas, contribuir para projetos open source e compartilhar conhecimento com a comunidade.''',
                'bio_full_en': '''Hi! I'm Ingride, a Junior Back-End Developer focused on Python and Django.

My journey in programming started with curiosity and turned into passion. Today, I work creating RESTful APIs, integrating systems, and developing solutions that make a difference.

I'm always looking to learn new technologies and improve my skills. I believe that clean and well-structured code is the foundation of any successful project.

When I'm not coding, I enjoy exploring new tools, contributing to open source projects, and sharing knowledge with the community.''',
                'bio_full_fr': '''Salut! Je suis Ingride, une developpeuse Back-End Junior specialisee en Python et Django.

Mon parcours dans la programmation a commence par la curiosite et s'est transforme en passion. Aujourd'hui, je travaille a la creation d'APIs RESTful, a l'integration de systemes et au developpement de solutions qui font la difference.

Je cherche toujours a apprendre de nouvelles technologies et a ameliorer mes competences. Je crois que le code propre et bien structure est la base de tout projet reussi.

Quand je ne code pas, j'aime explorer de nouveaux outils, contribuer a des projets open source et partager des connaissances avec la communaute.''',
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
            {'platform': 'linkedin', 'url': 'https://linkedin.com/in/ingridesouza', 'icon_class': 'linkedin'},
            {'platform': 'instagram', 'url': 'https://instagram.com/ingridesouza', 'icon_class': 'instagram'},
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
                    {'name': 'Python', 'proficiency': 85, 'icon_class': 'python', 'color': '#3776AB', 'is_featured': True},
                    {'name': 'Django', 'proficiency': 80, 'icon_class': 'django', 'color': '#092E20', 'is_featured': True},
                    {'name': 'Django REST Framework', 'proficiency': 75, 'icon_class': 'api', 'color': '#A30000', 'is_featured': True},
                    {'name': 'FastAPI', 'proficiency': 60, 'icon_class': 'fastapi', 'color': '#009688', 'is_featured': False},
                    {'name': 'PostgreSQL', 'proficiency': 70, 'icon_class': 'postgresql', 'color': '#336791', 'is_featured': True},
                    {'name': 'MySQL', 'proficiency': 65, 'icon_class': 'mysql', 'color': '#4479A1', 'is_featured': False},
                ]
            },
            {
                'name': 'Front-End',
                'name_en': 'Front-End',
                'name_fr': 'Front-End',
                'icon_class': 'layout',
                'order': 2,
                'skills': [
                    {'name': 'HTML5', 'proficiency': 85, 'icon_class': 'html5', 'color': '#E34F26', 'is_featured': False},
                    {'name': 'CSS3', 'proficiency': 80, 'icon_class': 'css3', 'color': '#1572B6', 'is_featured': False},
                    {'name': 'JavaScript', 'proficiency': 70, 'icon_class': 'javascript', 'color': '#F7DF1E', 'is_featured': True},
                    {'name': 'TypeScript', 'proficiency': 55, 'icon_class': 'typescript', 'color': '#3178C6', 'is_featured': False},
                    {'name': 'React', 'proficiency': 50, 'icon_class': 'react', 'color': '#61DAFB', 'is_featured': True},
                ]
            },
            {
                'name': 'DevOps & Ferramentas',
                'name_en': 'DevOps & Tools',
                'name_fr': 'DevOps & Outils',
                'icon_class': 'terminal',
                'order': 3,
                'skills': [
                    {'name': 'Git', 'proficiency': 80, 'icon_class': 'git', 'color': '#F05032', 'is_featured': True},
                    {'name': 'Docker', 'proficiency': 65, 'icon_class': 'docker', 'color': '#2496ED', 'is_featured': True},
                    {'name': 'Linux', 'proficiency': 70, 'icon_class': 'linux', 'color': '#FCC624', 'is_featured': False},
                    {'name': 'AWS', 'proficiency': 45, 'icon_class': 'aws', 'color': '#FF9900', 'is_featured': False},
                    {'name': 'CI/CD', 'proficiency': 55, 'icon_class': 'workflow', 'color': '#2088FF', 'is_featured': False},
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
        python = Skill.objects.filter(name='Python').first()
        django = Skill.objects.filter(name='Django').first()
        drf = Skill.objects.filter(name='Django REST Framework').first()
        react = Skill.objects.filter(name='React').first()
        postgresql = Skill.objects.filter(name='PostgreSQL').first()
        docker = Skill.objects.filter(name='Docker').first()
        javascript = Skill.objects.filter(name='JavaScript').first()
        html = Skill.objects.filter(name='HTML5').first()
        css = Skill.objects.filter(name='CSS3').first()

        projects_data = [
            {
                'slug': 'portfolio',
                'title': 'Portfolio Pessoal',
                'title_en': 'Personal Portfolio',
                'title_fr': 'Portfolio Personnel',
                'short_description': 'Este portfolio fullstack demonstrando minhas habilidades com Django REST e React.',
                'short_description_en': 'This fullstack portfolio demonstrating my skills with Django REST and React.',
                'short_description_fr': 'Ce portfolio fullstack demonstrant mes competences avec Django REST et React.',
                'full_description': '''Portfolio profissional desenvolvido com stack moderna para demonstrar habilidades tecnicas.

O backend utiliza Django REST Framework para API RESTful, com autenticacao JWT, cache com Redis e tasks assincronas com Celery.

O frontend foi construido com React, TypeScript e Vite, incluindo efeitos visuais com Three.js, animacoes com Framer Motion e suporte a multiplos idiomas.''',
                'year': 2025,
                'is_featured': True,
                'github_repo': 'https://github.com/ingridesouza/portfolio',
                'live_url': 'https://ingridesouza.dev',
                'technologies': [python, django, drf, react, postgresql, docker],
                'features': [
                    'API RESTful com Django REST Framework',
                    'Frontend React com TypeScript',
                    'Efeitos 3D com Three.js',
                    'Terminal interativo',
                    'Dark/Light mode',
                    'Suporte a PT-BR, EN e FR',
                ]
            },
            {
                'slug': 'api-tarefas',
                'title': 'API de Gerenciamento de Tarefas',
                'title_en': 'Task Management API',
                'title_fr': 'API de Gestion de Taches',
                'short_description': 'API REST completa para gerenciamento de tarefas com autenticacao JWT.',
                'short_description_en': 'Complete REST API for task management with JWT authentication.',
                'short_description_fr': 'API REST complete pour la gestion des taches avec authentification JWT.',
                'full_description': '''API robusta para gerenciamento de tarefas construida com Django REST Framework.

Inclui autenticacao JWT, permissoes granulares, filtragem avancada e documentacao automatica com Swagger.

O projeto demonstra boas praticas de desenvolvimento de APIs RESTful.''',
                'year': 2024,
                'is_featured': True,
                'github_repo': 'https://github.com/ingridesouza/task-api',
                'technologies': [python, django, drf, postgresql],
                'features': [
                    'Autenticacao JWT',
                    'CRUD completo de tarefas',
                    'Filtragem e ordenacao',
                    'Documentacao Swagger',
                    'Testes automatizados',
                ]
            },
            {
                'slug': 'ecommerce-api',
                'title': 'E-commerce API',
                'title_en': 'E-commerce API',
                'title_fr': 'API E-commerce',
                'short_description': 'Backend completo para loja virtual com carrinho, pedidos e pagamentos.',
                'short_description_en': 'Complete backend for online store with cart, orders and payments.',
                'short_description_fr': 'Backend complet pour boutique en ligne avec panier, commandes et paiements.',
                'full_description': '''API de e-commerce completa desenvolvida como projeto de estudo.

Implementa fluxo completo de compra, desde cadastro de produtos ate processamento de pedidos.

Inclui integracao com gateway de pagamento simulado e sistema de notificacoes.''',
                'year': 2024,
                'is_featured': True,
                'github_repo': 'https://github.com/ingridesouza/ecommerce-api',
                'technologies': [python, django, drf, postgresql, docker],
                'features': [
                    'Catalogo de produtos',
                    'Carrinho de compras',
                    'Processamento de pedidos',
                    'Integracao de pagamento',
                    'Sistema de cupons',
                ]
            },
            {
                'slug': 'landing-page',
                'title': 'Landing Page Responsiva',
                'title_en': 'Responsive Landing Page',
                'title_fr': 'Landing Page Responsive',
                'short_description': 'Landing page moderna e responsiva com animacoes CSS.',
                'short_description_en': 'Modern and responsive landing page with CSS animations.',
                'short_description_fr': 'Landing page moderne et responsive avec animations CSS.',
                'full_description': '''Landing page desenvolvida com foco em design responsivo e performance.

Utiliza tecnicas modernas de CSS como Grid, Flexbox e animacoes suaves.

Otimizada para SEO e acessibilidade.''',
                'year': 2024,
                'is_featured': False,
                'github_repo': 'https://github.com/ingridesouza/landing-page',
                'live_url': 'https://landing.ingridesouza.dev',
                'technologies': [html, css, javascript],
                'features': [
                    'Design responsivo',
                    'Animacoes CSS',
                    'Otimizado para SEO',
                    'Performance otimizada',
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
        python = Skill.objects.filter(name='Python').first()
        django = Skill.objects.filter(name='Django').first()
        drf = Skill.objects.filter(name='Django REST Framework').first()
        postgresql = Skill.objects.filter(name='PostgreSQL').first()
        git = Skill.objects.filter(name='Git').first()
        docker = Skill.objects.filter(name='Docker').first()

        experiences_data = [
            {
                'company_name': 'Tech Company',
                'position': 'Desenvolvedora Back-End Junior',
                'position_en': 'Junior Back-End Developer',
                'position_fr': 'Developpeuse Back-End Junior',
                'description': '''Desenvolvimento e manutencao de APIs RESTful com Django REST Framework.

Implementacao de novas funcionalidades e correcao de bugs.

Participacao em code reviews e documentacao tecnica.

Colaboracao com equipe de frontend para integracao de sistemas.''',
                'description_en': '''Development and maintenance of RESTful APIs with Django REST Framework.

Implementation of new features and bug fixes.

Participation in code reviews and technical documentation.

Collaboration with frontend team for system integration.''',
                'description_fr': '''Developpement et maintenance d'APIs RESTful avec Django REST Framework.

Implementation de nouvelles fonctionnalites et correction de bugs.

Participation aux revues de code et documentation technique.

Collaboration avec l'equipe frontend pour l'integration des systemes.''',
                'start_date': date(2024, 1, 1),
                'is_current': True,
                'technologies': [python, django, drf, postgresql, git, docker],
            },
            {
                'company_name': 'Freelance',
                'position': 'Desenvolvedora Web',
                'position_en': 'Web Developer',
                'position_fr': 'Developpeuse Web',
                'description': '''Desenvolvimento de sites e sistemas web para clientes diversos.

Criacao de landing pages responsivas e sistemas de gestao.

Integracao com APIs de terceiros e automacao de processos.''',
                'description_en': '''Development of websites and web systems for various clients.

Creation of responsive landing pages and management systems.

Integration with third-party APIs and process automation.''',
                'description_fr': '''Developpement de sites web et systemes web pour divers clients.

Creation de landing pages responsives et systemes de gestion.

Integration avec des APIs tierces et automatisation des processus.''',
                'start_date': date(2023, 6, 1),
                'end_date': date(2023, 12, 31),
                'is_current': False,
                'technologies': [python, django, git],
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
        python = Skill.objects.filter(name='Python').first()
        django = Skill.objects.filter(name='Django').first()
        javascript = Skill.objects.filter(name='JavaScript').first()

        education_data = [
            {
                'institution': 'Universidade XYZ',
                'degree_type': 'technologist',
                'degree_name': 'Analise e Desenvolvimento de Sistemas',
                'degree_name_en': 'Systems Analysis and Development',
                'degree_name_fr': 'Analyse et Developpement de Systemes',
                'start_date': date(2022, 2, 1),
                'is_current': True,
                'skills_learned': [python, django, javascript],
            },
            {
                'institution': 'Rocketseat',
                'degree_type': 'bootcamp',
                'degree_name': 'Ignite Python',
                'start_date': date(2023, 6, 1),
                'end_date': date(2023, 12, 1),
                'is_current': False,
                'skills_learned': [python, django],
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
                'name': 'Python para Data Science',
                'issuing_organization': 'Alura',
                'issue_date': date(2023, 8, 1),
                'credential_url': 'https://alura.com.br/certificate/123',
            },
            {
                'name': 'Django REST Framework',
                'issuing_organization': 'Udemy',
                'issue_date': date(2023, 10, 1),
                'credential_url': 'https://udemy.com/certificate/456',
            },
            {
                'name': 'Docker Essentials',
                'issuing_organization': 'Docker Inc.',
                'issue_date': date(2024, 1, 1),
                'credential_url': 'https://docker.com/certificate/789',
            },
        ]

        for cert_data in certifications_data:
            Certification.objects.update_or_create(
                name=cert_data['name'],
                issuing_organization=cert_data['issuing_organization'],
                defaults=cert_data
            )

        self.stdout.write(self.style.SUCCESS('Education and certifications created'))
