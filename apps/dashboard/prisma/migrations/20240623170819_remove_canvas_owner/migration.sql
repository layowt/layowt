/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Canvas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Canvas" DROP CONSTRAINT "Canvas_ownerId_fkey";

-- AlterTable
ALTER TABLE "Canvas" DROP COLUMN "ownerId";
