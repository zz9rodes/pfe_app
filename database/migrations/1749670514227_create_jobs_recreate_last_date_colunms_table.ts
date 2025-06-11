import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'jobs'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('last_date').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName,(table)=>{
      table.dropColumn('last_date')
    })
  }
}