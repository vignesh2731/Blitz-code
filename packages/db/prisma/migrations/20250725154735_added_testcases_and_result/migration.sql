/*
  Warnings:

  - The `testcases` column on the `Problem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "result" TEXT[],
DROP COLUMN "testcases",
ADD COLUMN     "testcases" TEXT[];
