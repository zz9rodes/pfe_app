import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'signatures'

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
      
      table.string('name')

      table.string('font')

      table.string('text')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}