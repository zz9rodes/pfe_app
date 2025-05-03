import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'companies'

  async up() {
    // Créer la procédure stockée pour vérifier la contrainte
    await this.db.raw(`
      DELIMITER //
      CREATE PROCEDURE check_unique_company_per_account(IN new_account_id INT)
      BEGIN
        DECLARE company_count INT;
        SELECT COUNT(*) INTO company_count FROM companies WHERE account_id = new_account_id;
        IF company_count > 0 THEN
          SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'An account can only have one company';
        END IF;
      END //
      DELIMITER ;
    `)

    // Créer le trigger
    await this.db.raw(`
      CREATE TRIGGER unique_company_per_account
      BEFORE INSERT ON ${this.tableName}
      FOR EACH ROW
      BEGIN
        CALL check_unique_company_per_account(NEW.account_id);
      END;
    `)
  }

  async down() {
    // Supprimer le trigger et la procédure en cas de rollback
    await this.db.raw(`DROP TRIGGER IF EXISTS unique_company_per_account;`)
    await this.db.raw(`DROP PROCEDURE IF EXISTS check_unique_company_per_account;`)
  }
}