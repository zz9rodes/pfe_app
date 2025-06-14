import Account from '#models/account'
import CvProfile from '#models/cv_profile'
import ApiResponse from '#models/utils/ApiResponse';

export class CvProfileService {
  async create(account: Account, data: any) {
    const {
      links = [],
      educations = [],
      work_experiences = [],
      personal_projects = [],
      ...cv_info
    } = data;

    const existingCvProfile = await account.related('cvProfiles').query().first();

    if (existingCvProfile) {
      return ApiResponse.error("You Already have a CvProfile",)
    }

        console.log({ slug: crypto.randomUUID(), ...cv_info })

    const cvProfile: CvProfile = await account.related('cvProfiles').create(
      { slug: crypto.randomUUID(), ...cv_info }
    );


    if (cvProfile) {
      if (links.length > 0) {
        await cvProfile.related('links').createMany(links);
      }

      if (educations.length > 0) {
        await cvProfile.related('educations').createMany(educations);
      }

      if (work_experiences.length > 0) {
        await cvProfile.related('workExperiences').createMany(work_experiences);
      }

      if (personal_projects.length > 0) {
        await cvProfile.related('personalProjects').createMany(personal_projects);
      }
    }

    
    return ApiResponse.success("ok",cvProfile);
  }

  async update(slug: string | any, data: any) {
    const {
      links = [],
      educations = [],
      work_experiences = [],
      personal_projects = [],
      ...cv_info
    } = data;
  
    const cvProfile: CvProfile | null = await CvProfile.findBy('slug', slug);
  
    if (!cvProfile) {
      return ApiResponse.error('CV non trouvé.');
    }
  
    cvProfile.merge(cv_info);
  
    if (links.length > 0) {
       await cvProfile.related('links').query().delete();
      await cvProfile.related('links').createMany(links);
    }
  
    if (educations.length > 0) {
      await cvProfile.related('educations').query().delete();
      await cvProfile.related('educations').createMany(educations);
    }
  
    if (work_experiences.length > 0) {
      await cvProfile.related('workExperiences').query().delete();
      await cvProfile.related('workExperiences').createMany(work_experiences);
    }
  
    if (personal_projects.length > 0) {
      await cvProfile.related('personalProjects').query().delete();
      await cvProfile.related('personalProjects').createMany(personal_projects);
    }
    
    await cvProfile.save();

    await cvProfile.load('links');
    await cvProfile.load('educations')
    await cvProfile.load('personalProjects')
    await cvProfile.load('workExperiences')

    return ApiResponse.success("ok",cvProfile)
  }

  async getCvprofileDetails(slug :string|any){
    const cvProfile= await CvProfile.findBy('slug',slug)

    if(!cvProfile){
      return ApiResponse.notFound("Ressource Not Found")
    }

    return ApiResponse.success("ok",cvProfile)
  }
}
