import factory from '@adonisjs/lucid/factories'
import Account from '#models/account'
import { AccountType } from '#models/utils/index';

export const AccountFactory =  factory
  .define(Account, async ({ faker }) => {


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
      avatarUrl:faker.image.avatarGitHub(),
      slug:faker.string.uuid(),
      firstName:faker.person.firstName(),
      lastName:faker.person.lastName(),
      phoneNumber:faker.phone.number({ style: 'national' }),
      dob:faker.date.birthdate({ mode: 'age', min: 18, max: 65 }),
      country:faker.location.country(),
      city:faker.location.city(),
      address:{
        title:faker.location.streetAddress(),
        long:faker.location.longitude(),
        lat:faker.location.latitude()
      },
      secondLangage:faker.helpers.arrayElement(languesProfessionnelles),
      firstLangage:faker.helpers.arrayElement(languesProfessionnelles),

      accountType:AccountType.PERSONNAL,

      roles:faker.person.jobTitle(),

      userId:0

    }
  })
  .build()