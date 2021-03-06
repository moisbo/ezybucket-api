-- MySQL Script generated by MySQL Workbench
-- Tue Aug 23 22:31:55 2016
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema ezybucket
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ezybucket` ;

-- -----------------------------------------------------
-- Schema ezybucket
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ezybucket` DEFAULT CHARACTER SET utf8 ;
USE `ezybucket` ;

-- -----------------------------------------------------
-- Table `ezybucket`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ezybucket`.`user` ;

CREATE TABLE IF NOT EXISTS `ezybucket`.`user` (
  `iduser` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`iduser`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ezybucket`.`bucket`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ezybucket`.`bucket` ;

CREATE TABLE IF NOT EXISTS `ezybucket`.`bucket` (
  `idbucket` INT(11) NOT NULL AUTO_INCREMENT,
  `bucket` VARCHAR(45) NULL DEFAULT NULL,
  `user_iduser` INT(11) NOT NULL,
  PRIMARY KEY (`idbucket`),
  INDEX `fk_bucket_user1_idx` (`user_iduser` ASC),
  CONSTRAINT `fk_bucket_user1`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `ezybucket`.`user` (`iduser`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ezybucket`.`progress`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ezybucket`.`progress` ;

CREATE TABLE IF NOT EXISTS `ezybucket`.`progress` (
  `idprogress` INT(11) NOT NULL AUTO_INCREMENT,
  `progress` VARCHAR(45) NOT NULL,
  `bucket_idbucket` INT(11) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`idprogress`),
  INDEX `fk_progress_bucket1_idx` (`bucket_idbucket` ASC),
  CONSTRAINT `fk_progress_bucket1`
    FOREIGN KEY (`bucket_idbucket`)
    REFERENCES `ezybucket`.`bucket` (`idbucket`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ezybucket`.`comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ezybucket`.`comment` ;

CREATE TABLE IF NOT EXISTS `ezybucket`.`comment` (
  `idcomment` INT(11) NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(500) NOT NULL,
  `progress_idprogress` INT(11) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `picture` LONGBLOB NULL DEFAULT NULL,
  PRIMARY KEY (`idcomment`),
  INDEX `fk_comment_progress_idx` (`progress_idprogress` ASC),
  CONSTRAINT `fk_comment_progress`
    FOREIGN KEY (`progress_idprogress`)
    REFERENCES `ezybucket`.`progress` (`idprogress`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `ezybucket`.`user` (`iduser`, `username`) VALUES ('1', 'moises');
