import { BaseSchema } from '@adonisjs/lucid/schema'
import { table } from 'console'

export default class extends BaseSchema {
  protected tableName = 'contracts'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('companie_id','company_id')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName,(table)=>{
      table.renameColumn('company_id','companie_id')
    })
  }
}