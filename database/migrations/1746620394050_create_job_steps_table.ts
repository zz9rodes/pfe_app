import { BaseSchema } from '@adonisjs/lucid/schema'

export default class  extends BaseSchema {
  protected tableName = 'job_steps'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') 

      table.string('name').notNullable()

      table.text('description').nullable()

      table.json('renumeration').nullable()

      table.string('priority').notNullable()

      table
        .integer('job_id')
        .unsigned()
        .references('id')
        .inTable('jobs')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()

        table.timestamp('created_at').notNullable()
        table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
