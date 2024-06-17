-- CreateTable
CREATE TABLE "rentals" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "equipamentId" INTEGER NOT NULL,
    "rentalDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rentals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_equipamentId_fkey" FOREIGN KEY ("equipamentId") REFERENCES "equipaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
