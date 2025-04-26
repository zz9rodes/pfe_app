import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'companies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('slug').unique().notNullable()
      table.boolean('is_verify').defaultTo(false)
      table.integer('admin_id').unsigned().references('id').inTable('accounts').onDelete('CASCADE').notNullable();

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

// @column()
//   declare slug:string
 
//   @belongsTo(()=>Account)
//   declare admin: BelongsTo<typeof Account>
  
//   @hasOne(()=>CompanyVersion)
//   declare detail: HasOne<typeof CompanyVersion>

//   @column()
//   declare isVerify:boolean