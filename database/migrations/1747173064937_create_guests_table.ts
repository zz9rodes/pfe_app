import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'guests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.boolean('accept').defaultTo(false)

      table.string('role').notNullable().defaultTo('Guest')

      table.json('scopes')

      table.integer('account_id').unsigned().references('id').inTable('accounts').onDelete('CASCADE')

      table.integer('company_id').unsigned().references('id').inTable('companies').onDelete('CASCADE')

      table.unique(['account_id','company_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}