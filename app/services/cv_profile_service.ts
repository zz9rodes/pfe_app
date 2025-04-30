import Account from '#models/account'
import CvProfile from '#models/cv_profile'

export class CvProfileService {
  async create(account: Account, data: any) {
    const {
      links = [],
      educations = [],
      work_experiences = [],
      personal_projects = [],
      ...cv_info
    } = data

    const cvProfile: CvProfile = await account.related('cvProfiles').create(
      { slug: crypto.randomUUID(), ...cv_info }
    )

    if (cvProfile) {
      if (links.length > 0) {
        await cvProfile.related('links').createMany(links)
      }

      if (educations.length > 0) {
        await cvProfile.related('educations').createMany(educations)
      }

      if (work_experiences.length > 0) {
        await cvProfile.related('workExperiences').createMany(work_experiences)
      }

      if (personal_projects.length > 0) {
        await cvProfile.related('personalProjects').createMany(personal_projects)
      }
    }


    return cvProfile
  }

  async update(slug: string | any, data: any) {
    const {
      links = [],
      educations = [],
      work_experiences = [],
      personal_projects = [],
      ...cv_info
    } = data

    const cvProfile: CvProfile | null = await CvProfile.findBy('slug', slug)

    if (cvProfile) {
      if (links.length > 0) {
        await cvProfile.related('links').createMany(links)
      }

      if (educations.length > 0) {
        await cvProfile.related('educations').createMany(educations)
      }

      if (work_experiences.length > 0) {
        await cvProfile.related('workExperiences').createMany(work_experiences)
      }

      if (personal_projects.length > 0) {
        await cvProfile.related('personalProjects').createMany(personal_projects)
      }
    }
    return cvProfile
  }
}
