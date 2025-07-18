import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
      email: "exemplejoe8@gmail.com",
      password: "exemplejoe8@gmail.com",
      isAdmin:true
    },
    {
      email: "admin@demo.com",
      password: "admin@demo.com",
      isAdmin:true
    },
    { email: "rodesnzie@icloud.com",
      password: "rodesnzie@icloud.com",
      isAdmin:true
    }
  ])
  }
}