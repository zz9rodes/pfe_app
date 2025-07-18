import factory from '@adonisjs/lucid/factories'
import Account from '#models/account'

export const AccountFactory = factory
  .define(Account, async ({ faker }) => {
    return {
      slug:faker.string.uuid(),
      firstName:faker.person.firstName(),
      lastName:faker.person.lastName(),
    }
  })
  .build()