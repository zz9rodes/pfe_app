import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'likes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')


      table.integer('post_id').unsigned().references('id').inTable('posts').onDelete('CASCADE')

      table.integer('account_id').unsigned().references('id').inTable('accounts').onDelete('CASCADE')

      table.unique(['post_id', 'account_id'])


      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}