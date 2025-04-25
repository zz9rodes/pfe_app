import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'accounts'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable();
      table.string('slug').notNullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('user_id')
      table.dropColumn('slug')
    })
  }
}