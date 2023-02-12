SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- Schema DataWiz
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema DataWiz
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DataWiz` DEFAULT CHARACTER SET utf8 ;
USE `DataWiz` ;
-- -----------------------------------------------------
-- Table `DataWiz`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DataWiz`.`users` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(45) NOT NULL,
    `password` BINARY(60) NOT NULL,
    `name` VARCHAR(45) NULL,
    `image_link` LONGTEXT NULL,
    PRIMARY KEY (`user_id`))
    ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `DataWiz`.`connections`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DataWiz`.`connections` (
   `connection_id` INT NOT NULL AUTO_INCREMENT,
   `user_id` INT NOT NULL,
   `url` LONGTEXT NOT NULL,
   `username` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` VARCHAR(45) NULL DEFAULT NULL,
    `deleted_at` VARCHAR(45) NULL DEFAULT NULL,
    `status` TINYINT NULL DEFAULT 0,
    PRIMARY KEY (`connection_id`, `user_id`),
    INDEX `fk_connections_users_idx` (`user_id` ASC) VISIBLE,
    CONSTRAINT `fk_connections_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `DataWiz`.`visualizations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DataWiz`.`visualizations` (
    `visualization_id` INT NOT NULL AUTO_INCREMENT,
    `connection_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `visualization_name` VARCHAR(45) NOT NULL,
    `chart_type` VARCHAR(45) NOT NULL,
    `x-table` VARCHAR(45) NULL,
    `x-attribute` VARCHAR(45) NULL,
    `y-table` VARCHAR(45) NULL,
    `y-attribute` VARCHAR(45) NULL,
    `sql_query` LONGTEXT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NULL DEFAULT NULL,
    `deleted_at` DATETIME NULL DEFAULT NULL,
    PRIMARY KEY (`visualization_id`, `connection_id`, `user_id`),
    INDEX `fk_visualizations_connections1_idx` (`connection_id` ASC, `user_id` ASC) VISIBLE,
    CONSTRAINT `fk_visualizations_connections1`
    FOREIGN KEY (`connection_id` , `user_id`)
    REFERENCES `mydb`.`connections` (`connection_id` , `user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;