import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'agreements'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
      .integer('account_id')
      .unsigned()
      .references('id')
      .inTable('accounts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .notNullable()

      table
      .integer('contract_id')
      .unsigned()
      .references('id')
      .inTable('contracts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .notNullable()


      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}