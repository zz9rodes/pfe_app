import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'companies_versions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // primary key

      table.string('name').notNullable()
      table.string('industry').notNullable()
      table.text('description').nullable()
      table.string('email').nullable()
      table.string('phone_number').nullable()
      table.json('address').nullable() // JSON field for Address object

      table.string('first_langage').notNullable()
      table.string('contry').notNullable()
      table.string('city').notNullable()
      table.string('avatar_url').nullable()
      table.string('cover_url').nullable()
      table.string('social_status').nullable()
      table.string('registration_nnumber').nullable()
      table.string('certificate_of_incorporation').nullable()

      table.boolean('is_active').defaultTo(false)

      table.integer('admin').unsigned().references('id').inTable('accounts').onDelete('CASCADE').notNullable();
      table.integer('company').unsigned().references('id').inTable('companies').onDelete('CASCADE').notNullable()


      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}