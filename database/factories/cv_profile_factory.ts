// factories/cv_profile_factory.ts
import  factory  from '@adonisjs/lucid/factories'
import CvProfile from '#models/cv_profile'
import Link from '#models/link'
import Education from '#models/education'
import WorkExperience from '#models/work_experience'
import PersonalProject from '#models/personal_project'

export const CvProfileFactory = factory.define(CvProfile, ({ faker }) => {
  return {
    bio: faker.lorem.paragraph(),
    focus_point: [faker.word.adjective(), faker.word.adjective()],
    competence: [faker.word.noun(), faker.word.noun(), faker.word.noun()],
  }
})
  .relation('links', () => LinkFactory)
  .relation('educations', () => EducationFactory)
  .relation('workExperiences', () => WorkExperienceFactory)
  .relation('personalProjects', () => PersonalProjectFactory)
  .build()

export const LinkFactory = factory.define(Link, ({ faker }) => {
  return {
    icon: faker.helpers.arrayElement(['linkedin', 'github', 'twitter', 'website']),
    title: faker.lorem.word(),
    href: faker.internet.url(),
  }
}).build()

export const EducationFactory = factory.define(Education, ({ faker }) => {
  return {
    title: faker.person.jobTitle() + ' Degree',
    institution: faker.company.name() + ' University',
    degree: faker.helpers.arrayElement(['Bachelor', 'Master', 'PhD']),
    year: faker.date.past().getFullYear().toString(),
  }
}).build()

export const WorkExperienceFactory = factory.define(WorkExperience, ({ faker }) => {
  return {
    title: faker.person.jobTitle(),
    description: faker.lorem.paragraph(),
    company: faker.company.name(),
    role: faker.person.jobType(),
    period: faker.number.int({ min: 12, max: 60 }).toString(),
    year: faker.date.past().getFullYear(),
    website: faker.internet.url(),
  }
}).build()

export const PersonalProjectFactory = factory.define(PersonalProject, ({ faker }) => {
  return {
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    website: faker.internet.url(),
  }
}).build()