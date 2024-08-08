-- DropForeignKey
ALTER TABLE "examples" DROP CONSTRAINT "examples_contentId_fkey";

-- DropForeignKey
ALTER TABLE "originals" DROP CONSTRAINT "originals_contentId_fkey";

-- DropForeignKey
ALTER TABLE "repurposes" DROP CONSTRAINT "repurposes_contentId_fkey";

-- DropForeignKey
ALTER TABLE "repurposes" DROP CONSTRAINT "repurposes_originalId_fkey";

-- AddForeignKey
ALTER TABLE "examples" ADD CONSTRAINT "examples_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "originals" ADD CONSTRAINT "originals_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repurposes" ADD CONSTRAINT "repurposes_originalId_fkey" FOREIGN KEY ("originalId") REFERENCES "originals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repurposes" ADD CONSTRAINT "repurposes_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
