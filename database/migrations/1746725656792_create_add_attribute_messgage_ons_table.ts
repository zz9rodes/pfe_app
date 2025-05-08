import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'applies'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('message').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('message')
    })
  }
}