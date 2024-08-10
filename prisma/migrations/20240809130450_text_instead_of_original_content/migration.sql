/*
  Warnings:

  - You are about to drop the column `generatedContent` on the `contents` table. All the data in the column will be lost.
  - You are about to drop the column `originalContent` on the `contents` table. All the data in the column will be lost.
  - Added the required column `text` to the `contents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contents" DROP COLUMN "generatedContent",
DROP COLUMN "originalContent",
ADD COLUMN     "text" TEXT NOT NULL;
