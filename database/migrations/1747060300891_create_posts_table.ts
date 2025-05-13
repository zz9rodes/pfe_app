import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('slug').notNullable()
      

      table.string('type').notNullable()

      table.string('text').nullable()

      table.boolean('is_publish').defaultTo(false)

      table.integer('company_id').unsigned().references('id').inTable('companies').onDelete('CASCADE')

      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}