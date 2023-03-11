
-- MySQL Workbench Forward Engineering
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
-- Table `DataWiz`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DataWiz`.`user` (
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
  `name` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `created_at` VARCHAR(45) NOT NULL,
  `updated_at` VARCHAR(45) DEFAULT NULL,
  `deleted_at` VARCHAR(45) DEFAULT NULL,
  `status` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`connection_id`, `user_id`))
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
  `updated_at` VARCHAR(45) DEFAULT NULL,
  `deleted_at` VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY (`visualization_id`))
ENGINE = InnoDB;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;