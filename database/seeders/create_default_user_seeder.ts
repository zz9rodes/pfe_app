import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([{
      email: "admin@demo.com",
      password: "admin@demo.com"
    },
    {
      email: "exemplejoe8@gmail.com",
      password: "exemplejoe8@gmail.com"
    },
    {
      email: "rodesnzie@icloud.com",
      password: "rodesnzie@icloud.com"
    }
  ])
  }
}