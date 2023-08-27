-- AlterTable
ALTER TABLE "FichaFuncionario" ADD COLUMN     "demitido" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Demissao" (
    "id" SERIAL NOT NULL,
    "motivo" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "funcionarioId" INTEGER,

    CONSTRAINT "Demissao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HorasExtras" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "valorPorHoras" DOUBLE PRECISION NOT NULL,
    "horas" INTEGER NOT NULL,
    "funcionarioId" INTEGER NOT NULL,

    CONSTRAINT "HorasExtras_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Demissao" ADD CONSTRAINT "Demissao_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "FichaFuncionario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorasExtras" ADD CONSTRAINT "HorasExtras_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "FichaFuncionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
