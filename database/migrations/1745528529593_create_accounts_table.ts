import { AccountType } from '#models/utils/index'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'accounts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name').notNullable()
      table.string('last_name')
      table.string('phone_number').unique().notNullable()
      table.timestamp('dob').nullable()  
      table.json('address')
      table.string('account_type').notNullable()
            .defaultTo(AccountType.PERSONNAL)
      table.string('country').nullable()
      table.string('city').nullable()
      table.string('avatar_url').nullable()
      table.string('first_langage').notNullable()
      table.string('second_langage').nullable()
      table.string('front_id_card').notNullable()
      table.string('back_id_card').notNullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}