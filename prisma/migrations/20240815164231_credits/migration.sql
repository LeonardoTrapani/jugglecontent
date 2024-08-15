/*
  Warnings:

  - You are about to drop the column `originalsCreated` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "originalsCreated",
ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 5;
