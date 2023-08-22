/*
  Warnings:

  - Changed the type of `nascimento` on the `FichaFuncionario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `admissao` on the `FichaFuncionario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FichaFuncionario" DROP COLUMN "nascimento",
ADD COLUMN     "nascimento" TIMESTAMP(3) NOT NULL,
DROP COLUMN "admissao",
ADD COLUMN     "admissao" TIMESTAMP(3) NOT NULL;
