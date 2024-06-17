/*
  Warnings:

  - Added the required column `amountRented` to the `rentals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rentals" ADD COLUMN     "amountRented" INTEGER NOT NULL;
