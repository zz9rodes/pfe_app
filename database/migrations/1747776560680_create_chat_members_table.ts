import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'chat_members'


  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('member_id')
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')

      table
        .integer('chat_id')
        .unsigned()
        .references('id')
        .inTable('chats')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
