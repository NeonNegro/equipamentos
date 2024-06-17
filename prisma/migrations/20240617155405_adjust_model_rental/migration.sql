/*
  Warnings:

  - You are about to drop the column `amountRented` on the `rentals` table. All the data in the column will be lost.
  - You are about to drop the column `rentalDate` on the `rentals` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `rentals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionType` to the `rentals` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('in', 'out');

-- AlterTable
ALTER TABLE "rentals" DROP COLUMN "amountRented",
DROP COLUMN "rentalDate",
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "transactionType" "TransactionType" NOT NULL;
