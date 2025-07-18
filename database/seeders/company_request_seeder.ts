import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { AccountFactory } from '#database/factories/account_factory'
import { CompanyRequestFactory } from '#database/factories/company_request_factory'
import { AccountType, CompanyStatus } from '#models/utils/index'
import { UserFactory } from '#database/factories/user_factory'

const company_requestData=[
  {
    "name": "Arron Js",
    "industry": "Développement de logiciels",
    "description": "Entreprise spécialisée dans le développement d'applications SaaS pour PME, offrant des solutions cloud sécurisées et évolutives, incluant la gestion de projet, la facturation automatisée et l’analyse de données en temps réel. Leurs outils intuitifs permettent aux petites entreprises d’optimiser leurs opérations sans investissement matériel lourd.",
    "email": "acanto0@flickr.com",
    "phoneNumber": "219-825-4502",
    "address": "Adresse",
    "firstLangage": "Romanche",
    "country": "Canada",
    "city": "Prince Rupert",
    "avatarUrl": "https://adocasts.com/",
    "coverUrl": "https://adocasts.com/",
    "socialStatus": "Capacité méthodique élargie",
    "registrationNumber": "54-9558119",
    "certificateOfIncorporation": "https://adocasts.com/",
    "isActive": false,
    "status": "Adaptateur client-serveur adaptatif"
  },
  {
    "name": "Flinn",
    "industry": "Réseaux sociaux",
    "description": "Plateforme sociale professionnelle dédiée aux créatifs (graphistes, photographes, rédacteurs), permettant de partager des portfolios, collaborer sur des projets et trouver des opportunités de travail. Avec des fonctionnalités de messagerie intégrée et un système de recommandation basé sur les compétences.",
    "email": "fdecourt1@1und1.de",
    "phoneNumber": "455-365-7397",
    "address": "Adresse",
    "firstLangage": "Aymara",
    "country": "Pérou",
    "city": "Zapatero",
    "avatarUrl": "https://adocasts.com/",
    "coverUrl": "https://adocasts.com/",
    "socialStatus": "Archive discrète améliorée",
    "registrationNumber": "25-6420442",
    "certificateOfIncorporation": "https://adocasts.com/",
    "isActive": true,
    "status": "Gestion budgétaire réciproque réalignée"
  },
  {
    "name": "Hakeem",
    "industry": "Technologie musicale",
    "description": "Service de streaming musical haute qualité utilisant l’IA pour personnaliser les playlists selon les goûts de l’utilisateur. Propose également des analyses statistiques pour les artistes indépendants et des outils de promotion.",
    "email": "hceschi2@1688.com",
    "phoneNumber": "639-809-6055",
    "address": "Adresse",
    "firstLangage": "Inuktitut",
    "country": "Chine",
    "city": "Juancheng",
    "avatarUrl": "https://adocasts.com/",
    "coverUrl": "https://adocasts.com/",
    "socialStatus": "Adaptateur évolutif optionnel",
    "registrationNumber": "13-3133249",
    "certificateOfIncorporation": "https://adocasts.com/",
    "isActive": true,
    "status": "Réseau neuronal non volatile partageable"
  },
  {
    "name": "Petronilla",
    "industry": "Médias sociaux",
    "description": "Agence de marketing digital offrant des stratégies ciblées sur les réseaux sociaux, incluant la gestion de campagnes publicitaires, la création de contenu engageant et l’analyse des performances pour maximiser la visibilité des marques.",
    "email": "pruhben3@yolasite.com",
    "phoneNumber": "396-100-9771",
    "address": "Adresse",
    "firstLangage": "Igbo",
    "country": "Chine",
    "city": "Jiaxian Chengguanzhen",
    "avatarUrl": "https://adocasts.com/",
    "coverUrl": "https://adocasts.com/",
    "socialStatus": "Réseau local bien modulé horizontal",
    "registrationNumber": "63-7133234",
    "certificateOfIncorporation": "https://adocasts.com/",
    "isActive": true,
    "status": "Moratoire orienté solution ciblée"
  },
  {
    "name": "Hazlett",
    "industry": "Éducation en ligne",
    "description": "Plateforme éducative proposant des formations certifiantes en développement web (front-end, back-end, DevOps), avec des cours interactifs, des projets pratiques et un accompagnement personnalisé pour faciliter l’insertion professionnelle.",
    "email": "hseatter4@answers.com",
    "phoneNumber": "936-938-6150",
    "address": "Adresse",
    "firstLangage": "Pendjabi",
    "country": "Chine",
    "city": "Nyima",
    "avatarUrl": "https://adocasts.com/",
    "coverUrl": "https://adocasts.com/",
    "socialStatus": "Architecture ouverte optimisée de base",
    "registrationNumber": "66-3269462",
    "certificateOfIncorporation": "https://adocasts.com/",
    "isActive": true,
    "status": "Circuit sensible au contexte implémenté"
  },
  {
    "name": "Happy",
    "industry": "Design graphique",
    "description": "Studio de design graphique créant des identités visuelles percutantes, incluant logos, chartes graphiques et supports print/digitaux. Leur approche sur mesure s’adapte aux besoins des startups comme des grandes entreprises.",
    "email": "hnutten5@state.gov",
    "phoneNumber": "557-610-3528",
    "address": "Adresse",
    "firstLangage": "Avar",
    "country": "Bangladesh",
    "city": "Feni",
    "avatarUrl": "https://adocasts.com/",
    "coverUrl": "https://adocasts.com/",
    "socialStatus": "Parallélisme sans défaut axé sur la qualité",
    "registrationNumber": "08-7993204",
    "certificateOfIncorporation": "https://adocasts.com/",
    "isActive": false,
    "status": "Interface graphique neuronale entièrement configurable"
  },
  {
    "name": "Jeannie",
    "industry": "Agroalimentaire",
    "description": " Éditeur de logiciels pour l’agroalimentaire, proposant des solutions de traçabilité, gestion des stocks et contrôle qualité, aidant les producteurs à se conformer aux normes sanitaires tout en optimisant leur productivité.",
    "email": "jcharville6@infoseek.co.jp",
    "phoneNumber": "934-989-0147",
    "address": "Adresse",
    "firstLangage": "Kuanyama",
    "country": "Indonésie",
    "city": "Ciparay",
    "avatarUrl": "https://adocasts.com/",
    "coverUrl": "https://adocasts.com/",
    "socialStatus": "Ensemble d'outils activé par grille proactive",
    "registrationNumber": "07-9084144",
    "certificateOfIncorporation": "https://adocasts.com/",
    "isActive": false,
    "status": "Architecture ouverte de 6ème génération diversifiée"
  },
  {
    "name": "Garey",
    "industry": "Divertissement",
    "description": "Société de production audiovisuelle organisant également des événements culturels (festivals, expositions). Leur expertise couvre la réalisation, le montage et la diffusion de contenus multimédias pour des marques et institutions.",
    "email": "gheckle7@foxnews.com",
    "phoneNumber": "743-383-0814",
    "address": "Adresse",
    "firstLangage": "Ndonga",
    "country": "Indonésie",
    "city": "Pantenan",
    "avatarUrl": "https://adocasts.com/",
    "coverUrl": "https://adocasts.com/",
    "socialStatus": "Tableau clair et partageable",
    "registrationNumber": "37-5291562",
    "certificateOfIncorporation": "https://adocasts.com/",
    "isActive": false,
    "status": "Accès clair et pensé élargi"
  },
  {
    "name": "Kelcy",
    "industry": "Transport",
    "description": "Entreprise de logistique fournissant des solutions de transport intelligent, gestion d’entrepôts automatisés et optimisation des flux d’approvisionnement pour réduire les coûts et les délais de livraison.",
    "email": "krupke8@msn.com",
    "phoneNumber": "390-902-1443",
    "address": "Adresse",
    "firstLangage": "Tibétain",
    "country": "Brésil",
    "city": "Alegrete",
    "avatarUrl": "https://adocasts.com/",
    "coverUrl": "https://adocasts.com/",
    "socialStatus": "Architecture holistique interchangeable",
    "registrationNumber": "62-4953991",
    "certificateOfIncorporation": "https://adocasts.com/",
    "isActive": false,
    "status": "Portail bidirectionnel centré sur le client"
  },
  {
    "name": "Estel",
    "industry": "Santé",
    "description": "Start-up en santé digitale développant des dispositifs médicaux connectés et des plateformes de télémédecine pour faciliter le diagnostic à distance et le suivi des patients chroniques.",
    "email": "eneely9@mlb.com",
    "phoneNumber": "531-518-5570",
    "address": "Adresse",
    "firstLangage": "Maori",
    "country": "Pakistan",
    "city": "Tando Muhammad Khān",
    "avatarUrl": "https://adocasts.com/",
    "coverUrl": "https://adocasts.com/",
    "socialStatus": "Collaboration ascendante en face à face",
    "registrationNumber": "52-5258185",
    "certificateOfIncorporation": "https://adocasts.com/",
    "isActive": true,
    "status": "Architecture ouverte incrémentielle diversifiée"
  }
]

export default class extends BaseSeeder {
  async run() {
    for (const company of company_requestData) {
      const user = await UserFactory.create()

      const account = await AccountFactory
        .merge({ accountType: AccountType.COMPANIES, userId: user.id })
        .create()

      await account.load('user')

      const request = await CompanyRequestFactory.merge({
        adminId: account.id,
        name: company.name,
        description: company.description,
        status: CompanyStatus.PENDING,
        registrationNumber: company.registrationNumber,
        industry: company.industry,
        socialStatus: company.socialStatus,
        firstLangage: account.firstLangage,
        address: account.address,
        city: account.city || company.city,
        country: account.country || company.country,
        certificateOfIncorporation: company.certificateOfIncorporation,
        email: account.user.email || company.email,
        phoneNumber: account.phoneNumber || company.phoneNumber,
        isActive: false,
      }).create()

      console.log(`Created company request with ID: ${request.id}`)
    }
  }
}