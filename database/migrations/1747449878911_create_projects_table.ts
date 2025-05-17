import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Projects extends BaseSchema {
  async up() {
    this.schema.createTable('projects', (table) => {
      table.increments('id')
      table.string('slug').notNullable().unique()
      table.string('name').notNullable()
      table.text('description').nullable()

      table.string('status').notNullable()
      table.string('priority').notNullable()

      table.date('start').nullable()
      table.string('objectif').nullable()

      table
        .integer('manager_id')
        .unsigned()
        .references('id')
        .inTable('guests')
        .onDelete('CASCADE')
        .notNullable()


      table
        .integer('company_id')
        .unsigned()
        .references('id')
        .inTable('companies')
        .onDelete('CASCADE').notNullable()

      table
        .integer('job_id')
        .unsigned()
        .references('id')
        .inTable('jobs')
        .onDelete('CASCADE').nullable().defaultTo(null)

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable('projects')
  }
}
