/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `users_address` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_address_user_id_key" ON "users_address"("user_id");
