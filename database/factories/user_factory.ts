import factory from '@adonisjs/lucid/factories'
import User from '#models/user'



export const UserFactory = factory
  .define(User, async ({ faker }) => {

    const email=faker.internet.email()

    return {
      email:email.toLocaleLowerCase(),
      password:email.toLocaleLowerCase()
    }
  })
  .build()