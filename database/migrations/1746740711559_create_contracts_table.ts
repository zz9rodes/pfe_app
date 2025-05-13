
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Contracts extends BaseSchema {
  protected tableName = 'contracts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('job_id').unsigned().references('id').inTable('jobs').onDelete('CASCADE')
      table.integer('companie_id').unsigned().references('id').inTable('companies').onDelete('CASCADE')

      table.string('text_description').nullable()
      table.string('title').notNullable()
      table.json('articles_and_clauses').notNullable()
      table.text('required_field').nullable()
      table.boolean('is_publish').defaultTo(false)

      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
