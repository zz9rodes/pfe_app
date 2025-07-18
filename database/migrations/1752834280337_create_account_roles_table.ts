import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'accounts'

  async up() {
      this.schema.alterTable(this.tableName, (table) => {
        table.string('roles').nullable()
      })
    }
  
    async down() {
      this.schema.alterTable(this.tableName,(table)=>{
        table.dropColumn('roles')
      })
    }
}