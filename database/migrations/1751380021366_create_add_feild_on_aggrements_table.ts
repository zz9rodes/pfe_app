import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'agreements'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Décommentez si la table n'a pas encore de clé primaire
      // table.increments('id').primary()

      table.string('reference').notNullable().unique()

      table
        .integer('signature_id')
        .unsigned()
        .references('id')
        .inTable('signatures')
        .onDelete('SET NULL') // ou 'SET NULL' si vous supprimez notNullable()
        .onUpdate('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('signature_id') // Supprime la contrainte de clé étrangère
      table.dropColumn('signature_id')
      table.dropColumn('reference')
    })
  }
}