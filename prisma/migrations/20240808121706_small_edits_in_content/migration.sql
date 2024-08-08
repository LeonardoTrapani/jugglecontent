/*
  Warnings:

  - You are about to drop the column `extraInfo` on the `examples` table. All the data in the column will be lost.
  - You are about to drop the column `extraInfo` on the `originals` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contents" ADD COLUMN     "extraInfo" TEXT,
ALTER COLUMN "url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "examples" DROP COLUMN "extraInfo";

-- AlterTable
ALTER TABLE "originals" DROP COLUMN "extraInfo";
