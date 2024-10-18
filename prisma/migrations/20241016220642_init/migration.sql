-- CreateTable
CREATE TABLE `User` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `email_user` VARCHAR(40) NOT NULL,
    `pass` VARCHAR(40) NOT NULL,
    `saldo` DECIMAL(19, 2) NOT NULL,

    UNIQUE INDEX `User_email_user_key`(`email_user`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_Info` (
    `id_user_info` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `nm_user` VARCHAR(40) NOT NULL,
    `prof_user` VARCHAR(40) NOT NULL,
    `gnr_user` INTEGER NOT NULL,
    `idade_user` INTEGER NOT NULL,

    PRIMARY KEY (`id_user_info`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Receita` (
    `id_receita` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_cat_rec` INTEGER NOT NULL,
    `valor_receita` DECIMAL(19, 2) NOT NULL,
    `data_receita` DATE NOT NULL,

    PRIMARY KEY (`id_receita`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cat_Rec` (
    `id_cat_rec` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_cat_rec` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Cat_Rec_nm_cat_rec_key`(`nm_cat_rec`),
    PRIMARY KEY (`id_cat_rec`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Despesa` (
    `id_despesa` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_cat_desp` INTEGER NOT NULL,
    `valor_despesa` DECIMAL(19, 2) NOT NULL,
    `data_despesa` DATE NOT NULL,

    PRIMARY KEY (`id_despesa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cat_Desp` (
    `id_cat_desp` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_cat_desp` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Cat_Desp_nm_cat_desp_key`(`nm_cat_desp`),
    PRIMARY KEY (`id_cat_desp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Metas` (
    `id_meta` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `nm_meta` VARCHAR(40) NOT NULL,
    `valor_meta` DECIMAL(19, 2) NOT NULL,

    PRIMARY KEY (`id_meta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User_Info` ADD CONSTRAINT `User_Info_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receita` ADD CONSTRAINT `Receita_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receita` ADD CONSTRAINT `Receita_id_cat_rec_fkey` FOREIGN KEY (`id_cat_rec`) REFERENCES `Cat_Rec`(`id_cat_rec`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Despesa` ADD CONSTRAINT `Despesa_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Despesa` ADD CONSTRAINT `Despesa_id_cat_desp_fkey` FOREIGN KEY (`id_cat_desp`) REFERENCES `Cat_Desp`(`id_cat_desp`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Metas` ADD CONSTRAINT `Metas_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
