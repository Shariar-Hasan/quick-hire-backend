-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_employer_id_fkey";

-- DropIndex
DROP INDEX "companies_employer_id_key";

-- AlterTable
ALTER TABLE "companies" ALTER COLUMN "employer_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
