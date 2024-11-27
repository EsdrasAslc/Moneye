import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default class CategoriaRepository {

  async catReceita() {
    const categoria = await prisma.$queryRaw`SELECT id_cat_rec as id, nm_cat_rec as nome FROM cat_rec ORDER BY nome;`;
    prisma.$disconnect()
    if (!categoria || categoria.length === 0) {
      return {
        success: false
      };
    } else {
        return {
            success: true,
            categorias: categoria
        }
    } 
  }

}
