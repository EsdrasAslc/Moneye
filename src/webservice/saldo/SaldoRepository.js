import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default class SaldoRepository {

  async buscaSaldo(id_user) {
    const saldo = await prisma.$queryRaw`SELECT saldo FROM User WHERE id_user = ${id_user}`;
    prisma.$disconnect()
    if (!saldo || saldo.length === 0) {
      return {
        success: false
      };
    } else {
        return {
            success: true,
            saldo: saldo[0].saldo
        }
    } 
  }
}
