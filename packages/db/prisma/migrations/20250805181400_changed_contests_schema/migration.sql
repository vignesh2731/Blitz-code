-- DropForeignKey
ALTER TABLE "Contest" DROP CONSTRAINT "Contest_winner_fkey";

-- AlterTable
ALTER TABLE "Contest" ALTER COLUMN "winner" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Contest" ADD CONSTRAINT "Contest_winner_fkey" FOREIGN KEY ("winner") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
