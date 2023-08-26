/*
  Warnings:

  - Added the required column `pago` to the `HorasExtras` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HorasExtras" ADD COLUMN     "pago" BOOLEAN NOT NULL;
