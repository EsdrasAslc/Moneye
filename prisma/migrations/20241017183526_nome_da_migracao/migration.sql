/*
  Warnings:

  - A unique constraint covering the columns `[id_user]` on the table `User_Info` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `saldo` DECIMAL(19, 2) NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `User_Info_id_user_key` ON `User_Info`(`id_user`);
