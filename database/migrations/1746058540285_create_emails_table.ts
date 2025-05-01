import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Emails extends BaseSchema {
  protected tableName = 'emails'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('from').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable();
      table.integer('to').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable();
      table.string('cc')
      table.string('bcc')
      table.string('subject').notNullable()
      table.text('html')
      table.text('text')
      table.enum('status', ['pending', 'sent', 'failed']).defaultTo('pending')
      table.text('error_message')
      table.timestamp('sent_at')
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
