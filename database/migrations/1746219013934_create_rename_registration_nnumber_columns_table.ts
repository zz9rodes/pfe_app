import { BaseSchema } from '@adonisjs/lucid/schema'

export default class RenameRegistrationNnumberColumn extends BaseSchema {
  async up() {
    this.schema.alterTable('company_versions', (table) => {
      table.renameColumn('registration_nnumber', 'registration_number')
    })

    this.schema.alterTable('company_requests', (table) => {
      table.renameColumn('registration_nnumber', 'registration_number')
    })
  }

  async down() {
    this.schema.alterTable('company_versions', (table) => {
      table.renameColumn('registration_number', 'registration_nnumber')
    })
  }
}
