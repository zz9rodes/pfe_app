import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('title').notNullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName,(table)=>{
      table.dropColumn('title')
    })
  }
}