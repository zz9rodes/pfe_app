import { ApplyStatus } from '#models/utils/index'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'applies'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
table.enum('status', Object.values(ApplyStatus)).defaultTo(ApplyStatus.PENDING);    })
  }

  async down() {
    this.schema.alterTable(this.tableName,(table)=>{
      table.dropColumn('status')
    })
  }
}