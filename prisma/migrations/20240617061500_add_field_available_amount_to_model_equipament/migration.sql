/*
  Warnings:

  - You are about to drop the column `amount` on the `equipaments` table. All the data in the column will be lost.
  - Added the required column `availableAmount` to the `equipaments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `equipaments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "equipaments" DROP COLUMN "amount",
ADD COLUMN     "availableAmount" INTEGER NOT NULL,
ADD COLUMN     "totalAmount" INTEGER NOT NULL;
