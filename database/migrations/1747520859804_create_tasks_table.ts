import { BaseSchema } from '@adonisjs/lucid/schema'
import { Priority, TaskStatus } from '#models/utils/index'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('slug').notNullable()
      table.string('name').notNullable()
      table.text('description').nullable()
      
      table
        .enum('priority', Object.values(Priority))
        .notNullable()
        .defaultTo(Priority.LOW)

      table.date('start_date').notNullable()
      table.date('due_date').notNullable()
      table.integer('estimation_time').notNullable()

      table
        .enum('status', Object.values(TaskStatus))
        .defaultTo(TaskStatus.CREATE)

      table
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')

      table
        .integer('assignee_id')
        .unsigned()
        .references('id')
        .inTable('project_teams')
        .onDelete('SET NULL')

      table
        .integer('step_id')
        .unsigned()
        .references('id')
        .inTable('job_steps')
        .onDelete('SET NULL')

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
