-- CreateEnum
CREATE TYPE "planType" AS ENUM ('FREE', 'BASIC', 'PREMIUM');

-- CreateTable
CREATE TABLE "users" (
    "uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hasAuthenticatedEmail" BOOLEAN NOT NULL DEFAULT false,
    "firstName" TEXT,
    "lastName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "subscription" (
    "transactionId" TEXT NOT NULL,
    "subscriptionActive" BOOLEAN NOT NULL,
    "paymentEmail" TEXT NOT NULL,
    "planType" "planType" NOT NULL,
    "dateOfPurchase" TEXT NOT NULL,
    "dateOfExpiry" TEXT NOT NULL,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("transactionId")
);

-- CreateTable
CREATE TABLE "website" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "website_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_transactionId_key" ON "subscription"("transactionId");

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "website" ADD CONSTRAINT "website_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
