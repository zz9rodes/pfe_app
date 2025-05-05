import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Jobs extends BaseSchema {
  protected tableName = 'jobs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('slug').notNullable()
      table.string('title').notNullable()
      table.string('country').notNullable()
      table.string('city').notNullable()
      table.text('description').nullable()
      table.string('industries').nullable()
      table.string('job_type').notNullable()
      table.json('price').notNullable()
      table.text('details').nullable()
      table.integer('years_experience').nullable()
      table.string('skill_required').nullable()
      table.dateTime('last_date').notNullable()
      table.string('gender').nullable()
      table.text('recruitment_steps').nullable()
      table.integer('company_id').unsigned().references('id').inTable('companies').onDelete('CASCADE')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}