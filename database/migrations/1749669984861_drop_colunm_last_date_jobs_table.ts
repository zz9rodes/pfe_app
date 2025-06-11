import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'jobs'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('last_date')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName,(table)=>{
      table.dateTime('last_date').notNullable()
    })
  }
}