/*
  Warnings:

  - You are about to drop the `website` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `numOfWebsites` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `dateOfPurchase` on the `subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dateOfExpiry` on the `subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "website" DROP CONSTRAINT "website_id_fkey";

-- AlterTable
ALTER TABLE "subscription" ADD COLUMN     "numOfWebsites" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "dateOfPurchase",
ADD COLUMN     "dateOfPurchase" TIMESTAMP(3) NOT NULL,
DROP COLUMN "dateOfExpiry",
ADD COLUMN     "dateOfExpiry" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "website";

-- CreateTable
CREATE TABLE "websites" (
    "websiteId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "websites_pkey" PRIMARY KEY ("websiteId")
);

-- CreateIndex
CREATE UNIQUE INDEX "websites_userId_key" ON "websites"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_userId_key" ON "subscription"("userId");

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "websites" ADD CONSTRAINT "websites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
