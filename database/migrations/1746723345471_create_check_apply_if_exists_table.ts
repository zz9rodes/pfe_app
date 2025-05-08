import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'applies'

  async up() {
    // Créer la procédure stockée pour vérifier les doublons
    await this.db.raw(`
      DELIMITER //
      CREATE PROCEDURE check_unique_apply_per_account(IN new_account_id INT, IN new_job_id INT)
      BEGIN
        DECLARE apply_count INT;
        SELECT COUNT(*) INTO apply_count FROM applies WHERE account_id = new_account_id AND job_id = new_job_id;
        IF apply_count > 0 THEN
          SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You have already applied for this job';
        END IF;
      END //
      DELIMITER ;
    `)

    // Créer le trigger pour vérifier les doublons avant l'insertion
    await this.db.raw(`
      CREATE TRIGGER unique_apply_per_account
      BEFORE INSERT ON ${this.tableName}
      FOR EACH ROW
      BEGIN
        CALL check_unique_apply_per_account(NEW.account_id, NEW.job_id);
      END;
    `)
  }

  async down() {
    // Supprimer le trigger et la procédure en cas de rollback
    await this.db.raw(`DROP TRIGGER IF EXISTS unique_apply_per_account;`)
    await this.db.raw(`DROP PROCEDURE IF EXISTS check_unique_apply_per_account;`)
  }
}