// seeders/cv_profile_seeder.ts
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import CvProfile from '#models/cv_profile'
import Link from '#models/link'
import Education from '#models/education'
import WorkExperience from '#models/work_experience'
import PersonalProject from '#models/personal_project'
import Account from '#models/account'
import { AccountType } from '#models/utils/index'
import { CvProfileFactory } from '#database/factories/cv_profile_factory'
import { randomUUID } from 'crypto'

export default class extends BaseSeeder {
  async run() {
    // Récupérer tous les comptes personnels sans CV
    const accounts = await Account.query()
      .where('account_type', AccountType.PERSONNAL)
      .whereNotExists(CvProfile.query().whereColumn('cv_profiles.account_id', 'accounts.id'))
      .limit(100) // Limiter pour éviter de surcharger lors des tests

    for (const account of accounts) {
      // Créer un profil CV de base
      const cvProfile = await CvProfile.create({
        accountId: account.id,
        slug:randomUUID(),
        bio: `${account.firstName} est un professionnel passionné avec plusieurs années d'expérience dans son domaine.`,
        focus_point: this.generateRandomSkills(),
        competence: this.generateRandomCompetences(),
      })

      // Ajouter des liens
      await this.createLinks(cvProfile.id, account)

      // Ajouter des formations
      await this.createEducations(cvProfile.id)

      // Ajouter des expériences professionnelles
      await this.createWorkExperiences(cvProfile.id)

      // Ajouter des projets personnels
      await this.createPersonalProjects(cvProfile.id)

      // Optionnel: créer un deuxième profil avec la factory
     
    }
  }

  private generateRandomSkills(): string[] {
    const skills = [
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'Vue.js',
      'UI/UX Design', 'Gestion de projet', 'DevOps', 'Cloud Computing'
    ]
    return skills.sort(() => 0.5 - Math.random()).slice(0, 3)
  }

  private generateRandomCompetences(): string[] {
    const competences = [
      'Développement Full-Stack', 'Architecture logicielle', 'Tests automatisés',
      'CI/CD', 'Base de données', 'Microservices', 'Mobile Development'
    ]
    return competences.sort(() => 0.5 - Math.random()).slice(0, 4)
  }

  private async createLinks(cvProfileId: number, account: Account) {
    const firstName = account.firstName.toLowerCase()
    const lastName = account?.lastName?.toLowerCase()

    await Link.createMany([
      {
        cvProfileId,
        icon: 'linkedin',
        title: 'LinkedIn',
        href: `https://linkedin.com/in/${firstName}-${lastName}`,
      },
      {
        cvProfileId,
        icon: 'github',
        title: 'GitHub',
        href: `https://github.com/${firstName}-${lastName}`,
      },
      {
        cvProfileId,
        icon: 'twitter',
        title: 'Twitter',
        href: `https://twitter.com/${firstName}_${lastName}`,
      },
    ])
  }

  private async createEducations(cvProfileId: number) {
    const degrees = ['Licence', 'Master', 'Doctorat', 'Diplôme']
    const fields = ['Informatique', 'Génie Logiciel', 'Mathématiques', 'Physique']
    const institutions = [
      'Université de Paris',
      'École Polytechnique',
      'Université de Lyon',
      'ENSIMAG'
    ]

    await Education.createMany([
      {
        cvProfileId,
        title: `${this.randomItem(degrees)} en ${this.randomItem(fields)}`,
        institution: this.randomItem(institutions),
        degree: this.randomItem(degrees),
        year: (2015 + Math.floor(Math.random() * 8)).toString(),
      },
      {
        cvProfileId,
        title: `${this.randomItem(degrees)} en ${this.randomItem(fields)}`,
        institution: this.randomItem(institutions),
        degree: this.randomItem(degrees),
        year: (2010 + Math.floor(Math.random() * 5)).toString(),
      },
    ])
  }

  private async createWorkExperiences(cvProfileId: number) {
    const roles = [
      'Développeur Full-Stack',
      'Ingénieur Logiciel',
      'Architecte Solutions',
      'Chef de Projet'
    ]
    const companies = [
      'Tech Solutions',
      'Innovatech',
      'WebCorp',
      'Digital Systems'
    ]

    await WorkExperience.createMany([
      {
        cvProfileId,
        title: this.randomItem(roles),
        description: 'Responsable du développement et de la maintenance des applications principales.',
        company: this.randomItem(companies),
        role: 'Développement',
        period: (12 + Math.floor(Math.random() * 48)).toString(),
        year: 2020 + Math.floor(Math.random() * 3),
        website: `https://${this.randomItem(companies).toLowerCase()}.com`,
      },
      {
        cvProfileId,
        title: this.randomItem(roles),
        description: 'Contribué à plusieurs projets majeurs avec une équipe agile.',
        company: this.randomItem(companies),
        role: 'Développement',
        period: (6 + Math.floor(Math.random() * 24)).toString(),
        year: 2018 + Math.floor(Math.random() * 4),
        website: `https://${this.randomItem(companies).toLowerCase()}.com`,
      },
    ])
  }

  private async createPersonalProjects(cvProfileId: number) {
    await PersonalProject.createMany([
      {
        cvProfileId,
        title: 'Application de Gestion de Tâches',
        description: 'Une application complète pour gérer les tâches quotidiennes avec des fonctionnalités avancées.',
        website: 'https://github.com/user/task-manager',
      },
      {
        cvProfileId,
        title: 'Blog Technique',
        description: 'Un blog partageant des connaissances techniques et des tutoriels.',
        website: 'https://tech-blog.example.com',
      },
    ])
  }

  private async createRandomProfileWithFactory(accountId: number) {
    await CvProfileFactory.merge({ accountId })
      .with('links', 3)
      .with('educations', 2)
      .with('workExperiences', 2)
      .with('personalProjects', 1)
      .create()
  }

  private randomItem(array: any[]) {
    return array[Math.floor(Math.random() * array.length)]
  }
}