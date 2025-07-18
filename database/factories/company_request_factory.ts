import factory from '@adonisjs/lucid/factories'
import CompanyRequest from '#models/company_request'

export const CompanyRequestFactory = factory
  .define(CompanyRequest, async ({ faker }) => {

      const languesProfessionnelles = [
        "Anglais",
        "Chinois (Mandarin)",
        "Espagnol",
        "Arabe",
        "Français",
        "Allemand",
        "Portugais",
        "Japonais",
        "Hindi",
        "Russe"
      ];

    return {

      name:faker.company.name(),
      slug:faker.string.uuid(),
      industry:faker.lorem.words(2),
      description:faker.lorem.paragraphs(),
      email:faker.internet.email(),
      phoneNumber:faker.phone.number({style:"national"}),
      country:faker.location.country(),
      city:faker.location.city(),
      address:{
        title:faker.location.streetAddress(),
        long:faker.location.longitude(),
        lat:faker.location.latitude()
      },
      firstLangage:faker.helpers.arrayElement(languesProfessionnelles),
      avatarUrl:faker.image.avatar(),
      coverUrl:faker.image.avatar(),
      socialStatus:faker.image.avatar(),
      certificateOfIncorporation:faker.image.avatar(),
      registrationNumber:faker.image.avatar(),
      adminId:faker.number.int()    
    }
  })
  .build()

  