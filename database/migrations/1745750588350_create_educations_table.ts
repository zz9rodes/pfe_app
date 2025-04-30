import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'educations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('institution').nullable()
      table.string('degree').nullable()
      table.string('year').nullable()
      table.integer('cv_profile_id').unsigned().references('id').inTable('cv_profiles').onDelete('CASCADE')
      

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}