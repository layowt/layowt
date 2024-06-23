/*
  Warnings:

  - You are about to drop the `subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `websites` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ComponentType" AS ENUM ('text', 'timestamp', 'div');

-- CreateEnum
CREATE TYPE "pageStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'DELETED');

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_userId_fkey";

-- DropForeignKey
ALTER TABLE "websites" DROP CONSTRAINT "websites_userId_fkey";

-- DropTable
DROP TABLE "subscription";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "websites";

-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hasAuthenticatedEmail" BOOLEAN NOT NULL DEFAULT false,
    "firstName" TEXT,
    "lastName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "transactionId" TEXT NOT NULL,
    "subscriptionActive" BOOLEAN NOT NULL,
    "paymentEmail" TEXT NOT NULL,
    "planType" "planType" NOT NULL,
    "dateOfPurchase" TIMESTAMP(3) NOT NULL,
    "dateOfExpiry" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "numOfWebsites" INTEGER NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("transactionId")
);

-- CreateTable
CREATE TABLE "Website" (
    "userId" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,
    "websiteName" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "websiteLogo" TEXT NOT NULL,
    "websitePrimaryColor" TEXT NOT NULL,
    "websiteSecondaryColor" TEXT NOT NULL,
    "websiteBackgroundColor" TEXT NOT NULL DEFAULT '#ffffff',
    "hasBeenPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "lastUpdatedUid" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Website_pkey" PRIMARY KEY ("websiteId")
);

-- CreateTable
CREATE TABLE "EarlyAccess" (
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EarlyAccess_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Component" (
    "type" "ComponentType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "properties" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Component_pkey" PRIMARY KEY ("type")
);

-- CreateTable
CREATE TABLE "Canvas" (
    "websiteId" TEXT NOT NULL,
    "canvasId" TEXT NOT NULL,
    "canvasUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Canvas_pkey" PRIMARY KEY ("canvasId")
);

-- CreateTable
CREATE TABLE "Page" (
    "canvasId" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "pageTitle" TEXT NOT NULL,
    "pageSlug" TEXT NOT NULL,
    "pageStatus" "pageStatus" NOT NULL DEFAULT 'DRAFT',
    "pageDeleted" BOOLEAN NOT NULL DEFAULT false,
    "pageDeletedAt" TIMESTAMP(3),
    "pagePrimaryColor" TEXT NOT NULL,
    "pageSecondaryColor" TEXT NOT NULL,
    "pageBackgroundColor" TEXT NOT NULL DEFAULT '#ffffff',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("pageId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_transactionId_key" ON "Subscription"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Canvas_websiteId_key" ON "Canvas"("websiteId");

-- CreateIndex
CREATE UNIQUE INDEX "Canvas_canvasUrl_key" ON "Canvas"("canvasUrl");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Canvas" ADD CONSTRAINT "Canvas_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("websiteId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Canvas" ADD CONSTRAINT "Canvas_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_canvasId_fkey" FOREIGN KEY ("canvasId") REFERENCES "Canvas"("canvasId") ON DELETE RESTRICT ON UPDATE CASCADE;
