import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'file_message'

  async up() {
     this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('file_id').unsigned().references('id').inTable('files').onDelete('CASCADE')

      table.integer('message_id').unsigned().references('id').inTable('messages').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}