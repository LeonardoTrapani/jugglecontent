/*
  Warnings:

  - Made the column `originalContent` on table `contents` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "contents" ALTER COLUMN "originalContent" SET NOT NULL;
