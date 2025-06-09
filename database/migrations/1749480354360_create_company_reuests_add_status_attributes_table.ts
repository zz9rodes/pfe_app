import { CompanyStatus } from '#models/utils/index'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'company_requests'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('status').defaultTo(CompanyStatus.PENDING)
    })
  }

  async down() {
     this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('status') 
    })
  }
}