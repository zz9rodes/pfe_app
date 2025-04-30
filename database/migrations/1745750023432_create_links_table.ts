import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Links extends BaseSchema {
  protected tableName = 'links'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('icon').nullable()
      table.string('title').nullable()
      table.string('href').notNullable()
      table.integer('cv_profile_id').unsigned().references('id').inTable('cv_profiles').onDelete('CASCADE')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
