/*
  Warnings:

  - You are about to drop the `orgs_address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orgs_address" DROP CONSTRAINT "orgs_address_address_id_fkey";

-- DropForeignKey
ALTER TABLE "orgs_address" DROP CONSTRAINT "orgs_address_user_id_fkey";

-- DropTable
DROP TABLE "orgs_address";

-- CreateTable
CREATE TABLE "users_address" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,

    CONSTRAINT "users_address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "users_address_user_id_idx" ON "users_address"("user_id");

-- AddForeignKey
ALTER TABLE "users_address" ADD CONSTRAINT "users_address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_address" ADD CONSTRAINT "users_address_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;
