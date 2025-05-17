import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'project_teams'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('member_id')
        .unsigned()
        .references('id')
        .inTable('guests')
        .onDelete('CASCADE')
        .notNullable()

      table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE')

      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}