import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CvProfiles extends BaseSchema {
  protected tableName = 'cv_profiles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('slug')
      table.text('bio').nullable()
      table.string('focus_point').nullable()
      table.string('competence').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table
        .integer('account_id')
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')
        .unique()
        .notNullable()

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
