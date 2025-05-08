import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'applies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('slug')

      table.boolean('approved').defaultTo(false)

      table
      .integer('job_id')
      .unsigned()
      .references('id')
      .inTable('jobs')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .notNullable()

      table
      .integer('account_id')
      .unsigned()
      .references('id')
      .inTable('accounts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}