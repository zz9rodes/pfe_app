import { SubscriptionStatus } from '#models/utils/index'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'subscriptions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('account_id').unsigned().references('id').inTable('accounts').onDelete('CASCADE')
      table.integer('subscription_plan_id').unsigned().references('id').inTable('subscription_plans').onDelete('SET NULL')
      table.string('status').defaultTo('ACTIVE')
      table.timestamp('start_date').notNullable()
      table.timestamp('end_date').nullable()
      table.string('payment_reference').nullable()
      table.boolean('is_verified').defaultTo(false)
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}