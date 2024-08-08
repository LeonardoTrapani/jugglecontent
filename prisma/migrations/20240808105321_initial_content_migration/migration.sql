-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('youtubeVideo', 'linkedinPost', 'blog', 'tweet');

-- CreateTable
CREATE TABLE "examples" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "extraInfo" TEXT,
    "contentId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "examples_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "originals" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "extraInfo" TEXT,
    "contentId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "originals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contents" (
    "id" TEXT NOT NULL,
    "type" "ContentType" NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "originalContent" TEXT,
    "generatedContent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repurposes" (
    "id" TEXT NOT NULL,
    "originalId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "repurposes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "examples_contentId_key" ON "examples"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "originals_contentId_key" ON "originals"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "repurposes_originalId_key" ON "repurposes"("originalId");

-- CreateIndex
CREATE UNIQUE INDEX "repurposes_contentId_key" ON "repurposes"("contentId");

-- AddForeignKey
ALTER TABLE "examples" ADD CONSTRAINT "examples_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examples" ADD CONSTRAINT "examples_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "originals" ADD CONSTRAINT "originals_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "originals" ADD CONSTRAINT "originals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repurposes" ADD CONSTRAINT "repurposes_originalId_fkey" FOREIGN KEY ("originalId") REFERENCES "originals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repurposes" ADD CONSTRAINT "repurposes_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
