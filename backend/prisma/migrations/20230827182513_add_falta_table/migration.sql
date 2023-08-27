/*
  Warnings:

  - You are about to drop the `Demissao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Demissao" DROP CONSTRAINT "Demissao_funcionarioId_fkey";

-- DropTable
DROP TABLE "Demissao";

-- CreateTable
CREATE TABLE "Falta" (
    "id" SERIAL NOT NULL,
    "dataFalta" TIMESTAMP(3) NOT NULL,
    "tipoFalta" TEXT NOT NULL,
    "descricaoFalta" TEXT NOT NULL,
    "funcionarioId" INTEGER,

    CONSTRAINT "Falta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Falta" ADD CONSTRAINT "Falta_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "FichaFuncionario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
