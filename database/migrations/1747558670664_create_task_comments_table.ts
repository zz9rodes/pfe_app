import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'task_comments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

       
      table.integer('task_id').unsigned().references('id').inTable('tasks').onDelete('CASCADE')

      table.integer('author_id').unsigned().references('id').inTable('project_teams').onDelete('CASCADE')


      table.text('text').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}