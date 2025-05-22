import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'subscription_plans'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable() //Free , MagicPro , Basic , Pro , Premium
      table.integer('price').notNullable()
      table.string('currency').notNullable().defaultTo('XAF')
      table.integer('duration').notNullable() 
      table.text('features').nullable() 
      table.boolean('is_active').defaultTo(true)

      table.timestamp('created_at')
      table.timestamp('updated_at').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}