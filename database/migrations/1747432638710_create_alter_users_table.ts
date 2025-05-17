import { generateRandomPassword } from '#models/utils/helper';
import { BaseSchema } from '@adonisjs/lucid/schema'

const generatedPassword: string = generateRandomPassword();

export default class extends BaseSchema {
  protected tableName = 'users'


  async up() {
    this.schema.alterTable(this.tableName, (table) => {
        table.string('password').defaultTo(generatedPassword).alter();
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('password').notNullable().alter();
    });
  }
}