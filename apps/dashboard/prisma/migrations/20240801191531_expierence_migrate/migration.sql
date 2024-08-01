-- CreateEnum
CREATE TYPE "experienceLevel" AS ENUM ('businessOwner', 'developer', 'designer', 'marketer', 'student', 'other');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "experienceLevel" "experienceLevel";
